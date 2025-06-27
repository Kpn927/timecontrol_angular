// reloj-morse.ts
import { Component, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { BaseClock } from '../../components/baseclock';
import { slider } from '../../components/slider/slider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reloj-morse',
  templateUrl: './reloj-morse.html',
  styleUrls: ['./reloj-morse.css'],
  standalone: true,
  imports: [slider, CommonModule]
})
export class RelojMorse extends BaseClock implements AfterViewInit, OnDestroy {

  sliderHours: number = 0;
  sliderMinutes: number = 0;
  sliderSeconds: number = 0;

  lightStates = [false, false, false];

  activeLightIndex: number | null = null;

  private morseMap: { [key: number]: string } = {
    0: '-----',
    1: '.----',
    2: '..---',
    3: '...--',
    4: '....-',
    5: '.....',
    6: '-....',
    7: '--...',
    8: '---..',
    9: '----.',
  };

  private dotDuration: number = 100;
  private dashDuration: number = this.dotDuration * 3;
  private signalGap: number = this.dotDuration;
  private charGap: number = this.dotDuration * 3;
  private wordGap: number = this.dotDuration * 7;

  private morseSequence: { type: 'on' | 'off', duration: number, light: number }[] = [];
  private sequenceInterval: any;
  private sequenceIndex: number = 0;

  constructor() {
    super();
    const ahora = new Date();
    this.sliderHours = ahora.getHours();
    this.sliderMinutes = ahora.getMinutes();
    this.sliderSeconds = ahora.getSeconds();
  }

  ngAfterViewInit(): void {
    this.actualizarHora();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.stopMorseDisplay();
  }

  protected override actualizarHora(): void {
    super.actualizarHora();

    const timeParts = this.horaActual.split(':').map(Number);
    const hours = timeParts[0];
    const minutes = timeParts[1];
    const seconds = timeParts[2];

    this.sliderHours = hours;
    this.sliderMinutes = minutes;
    this.sliderSeconds = seconds;

    this.generateMorseSequence(hours, minutes, seconds);
    this.startMorseDisplay();
  }

  override actualizarHoraManual(event: { horas: number, minutos: number, segundos: number }): void {
    super.actualizarHoraManual(event);

    this.sliderHours = event.horas;
    this.sliderMinutes = event.minutos;
    this.sliderSeconds = event.segundos;

    this.generateMorseSequence(event.horas, event.minutos, event.segundos);
    this.startMorseDisplay();
  }

  onAjusteIniciado(): void {
    this.comenzarAjuste();
    this.stopMorseDisplay();
    this.resetLightStates();
    console.log('Ajuste de slider iniciado. Reloj Morse pausado.');
  }

  onAjusteTerminado(): void {
    this.terminarAjuste();
    console.log('Ajuste de slider terminado. Reloj Morse reanudado.');
  }

  private convertToMorse(num: number): string {
    const numStr = num.toString().padStart(2, '0');
    let morse = '';
    for (const digit of numStr) {
      morse += this.morseMap[parseInt(digit)] + ' ';
    }
    return morse.trim();
  }

  private generateMorseSequence(hours: number, minutes: number, seconds: number): void {
    this.morseSequence = [];

    const addMorseForNumber = (num: number, lightIndex: number) => {
      const morseStr = this.convertToMorse(num);
      for (let i = 0; i < morseStr.length; i++) {
        const char = morseStr[i];
        if (char === '.') {
          this.morseSequence.push({ type: 'on', duration: this.dotDuration, light: lightIndex });
          this.morseSequence.push({ type: 'off', duration: this.signalGap, light: lightIndex });
        } else if (char === '-') {
          this.morseSequence.push({ type: 'on', duration: this.dashDuration, light: lightIndex });
          this.morseSequence.push({ type: 'off', duration: this.signalGap, light: lightIndex });
        } else if (char === ' ') {
          this.morseSequence.push({ type: 'off', duration: this.charGap, light: lightIndex });
        }
      }
    };

    addMorseForNumber(hours, 0);
    this.morseSequence.push({ type: 'off', duration: this.wordGap, light: -1 });

    addMorseForNumber(minutes, 1);
    this.morseSequence.push({ type: 'off', duration: this.wordGap, light: -1 });

    addMorseForNumber(seconds, 2);
    this.morseSequence.push({ type: 'off', duration: this.wordGap, light: -1 });
  }

  private startMorseDisplay(): void {
    this.stopMorseDisplay();
    this.sequenceIndex = 0;
    this.resetLightStates();

    const executeNextStep = () => {
      if (this.sequenceIndex < this.morseSequence.length) {
        const step = this.morseSequence[this.sequenceIndex];

        this.resetLightStates();

        if (step.type === 'on') {
          this.lightStates[step.light] = true;
          this.activeLightIndex = step.light;
        } else {
          this.activeLightIndex = null;
        }

        this.sequenceInterval = setTimeout(() => {
          this.sequenceIndex++;
          executeNextStep();
        }, step.duration);

      } else {
        this.stopMorseDisplay();
        this.resetLightStates();
      }
    };

    executeNextStep();
  }

  private stopMorseDisplay(): void {
    if (this.sequenceInterval) {
      clearTimeout(this.sequenceInterval);
      this.sequenceInterval = null;
    }
    this.resetLightStates();
  }

  private resetLightStates(): void {
    this.lightStates = [false, false, false];
    this.activeLightIndex = null;
  }
}

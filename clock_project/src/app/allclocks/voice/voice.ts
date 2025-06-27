import { Component, OnInit } from '@angular/core';
import { BaseClock } from '../../components/baseclock';
import { slider } from '../../components/slider/slider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-voice-clock',
  templateUrl: './voice.html',
  styleUrls: ['./voice.css'],
  standalone: true,
  imports: [slider, CommonModule],
})
export class Voice extends BaseClock implements OnInit {
  private synth: SpeechSynthesis;
  private utterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    super();
    this.synth = window.speechSynthesis;
  }

  getTimeAsText(): string {
    const [horas, minutos] = this.horaActual.split(':').map(Number);
    const hourText = horas > 12 ? horas - 12 : horas;
    const minuteText = minutos === 0 ? '' : `y ${minutos} minutos`;
    const period = horas >= 12 ? 'de la tarde' : 'de la mañana';
    return `Son las ${hourText} ${minuteText} ${period}`;
  }

  speakTime(): void {
    if (this.synth.speaking) {
      this.synth.cancel();
    }

    const text = this.getTimeAsText();
    this.utterance = new SpeechSynthesisUtterance(text);
    this.utterance.lang = 'en-US';
    this.synth.speak(this.utterance);
  }

  override actualizarHoraManual(event: { horas: number, minutos: number, segundos: number }): void {
    super.actualizarHoraManual(event);
    if (!this.relojEstatico) {
      this.speakTime();
    }
  }
}
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { slider } from '../../components/slider/slider';
import { BaseClock } from '../../components/baseclock';

@Component({
  selector: 'app-roman-clock',
  standalone: true,
  imports: [FormsModule, CommonModule, slider],
  templateUrl: './reloj-romano.html',
  styleUrls: ['./reloj-romano.css']
})
export class RelojRomano extends BaseClock implements OnInit, OnDestroy {
  userHour: number;
  userMinute: number;
  userSecond: number;

  romanNumerals: string[] = [
    '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'
  ];

  private manualAdjustTimeout: any;

  constructor() {
    super();

    const now = new Date();
    this.userHour = now.getHours();
    this.userMinute = now.getMinutes();
    this.userSecond = now.getSeconds();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.syncDisplayTimeWithBaseClock();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this.manualAdjustTimeout) {
      clearTimeout(this.manualAdjustTimeout);
    }
  }

  override actualizarHora(): void {
    super.actualizarHora();
    this.syncDisplayTimeWithBaseClock();
  }

  override actualizarHoraManual(event: { horas: number, minutos: number, segundos: number }): void {
    this.comenzarAjuste();

    super.actualizarHoraManual(event);

    this.syncDisplayTimeWithBaseClock();

    if (this.manualAdjustTimeout) {
      clearTimeout(this.manualAdjustTimeout);
    }
    this.manualAdjustTimeout = setTimeout(() => {
      this.terminarAjuste();
    }, 1500);
  }

  private syncDisplayTimeWithBaseClock(): void {

    const [hours, minutes, seconds] = this.horaActual.split(':').map(Number);

    this.userHour = hours;
    this.userMinute = minutes;
    this.userSecond = seconds;
  }

  getRomanTime(): string {
    const displayHour = this.userHour % 12 || 12;

    const romanHour = this.romanNumerals[displayHour];
    const romanMinute = this.convertToRoman(this.userMinute);
    const romanSecond = this.convertToRoman(this.userSecond);
    return `${romanHour}:${romanMinute}:${romanSecond}`;
  }

  private convertToRoman(num: number): string {
    if (num === 0) return 'N';
    const romanMapping = [
      { value: 50, numeral: 'L' },
      { value: 40, numeral: 'XL' },
      { value: 10, numeral: 'X' },
      { value: 9, numeral: 'IX' },
      { value: 5, numeral: 'V' },
      { value: 4, numeral: 'IV' },
      { value: 1, numeral: 'I' },
    ];
    let result = '';
    for (const { value, numeral } of romanMapping) {
      while (num >= value) {
        result += numeral;
        num -= value;
      }
    }
    return result;
  }

  onAjusteIniciado(): void {
    this.comenzarAjuste();
    console.log('Ajuste de slider iniciado. Reloj pausado.');
  }

  onAjusteTerminado(): void {
    this.terminarAjuste();
    console.log('Ajuste de slider terminado. Reloj reanudado.');
  }

  onTiempoSliderCambiado(event: { horas: number, minutos: number, segundos: number }): void {
    this.actualizarHoraManual(event);
  }
}

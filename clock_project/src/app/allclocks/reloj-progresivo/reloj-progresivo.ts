import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { slider } from '../../components/slider/slider';
import { BaseClock } from '../../components/baseclock';

@Component({
  selector: 'app-progress-clock',
  templateUrl: './reloj-progresivo.html',
  styleUrls: ['./reloj-progresivo.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, slider],
})
export class RelojProgresivo extends BaseClock implements OnInit, OnDestroy {
  progressPercentage: string = '0.00';
  timeText: string = '00:00:00';

  userHour: number;
  userMinute: number;
  userSecond: number;

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
    this.syncTimeAndProgressDisplay();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this.manualAdjustTimeout) {
      clearTimeout(this.manualAdjustTimeout);
    }
  }

  override actualizarHora(): void {
    super.actualizarHora();
    this.syncTimeAndProgressDisplay();
  }

  override actualizarHoraManual(event: { horas: number, minutos: number, segundos: number }): void {
    this.comenzarAjuste();

    super.actualizarHoraManual(event);

    this.syncTimeAndProgressDisplay();

    if (this.manualAdjustTimeout) {
      clearTimeout(this.manualAdjustTimeout);
    }
    this.manualAdjustTimeout = setTimeout(() => {
      this.terminarAjuste();
    }, 1500);
  }

  private syncTimeAndProgressDisplay(): void {
    const [hours, minutes, seconds] = this.horaActual.split(':').map(Number);

    this.userHour = hours;
    this.userMinute = minutes;
    this.userSecond = seconds;

    const totalSecondsInDay = 24 * 60 * 60;
    const secondsElapsed =
      this.userHour * 3600 + this.userMinute * 60 + this.userSecond;

    this.progressPercentage = ((secondsElapsed / totalSecondsInDay) * 100).toFixed(2);
    this.timeText = this.formatTime(this.userHour, this.userMinute, this.userSecond);
  }

  private formatTime(hours: number, minutes: number, seconds: number): string {
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
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

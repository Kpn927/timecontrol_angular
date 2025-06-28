import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseClock } from '../../components/baseclock';
import { slider } from '../../components/slider/slider';

@Component({
  selector: 'app-spiral-clock',
  templateUrl: './reloj-espiral.html',
  styleUrls: ['./reloj-espiral.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, slider]
})
export class RelojEspiral extends BaseClock implements OnInit, OnDestroy {
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

  getSpiralStyle(unit: number, max: number) {
    const scale = unit / max;
    const size = 150 * scale + 50;
    return {
      width: `${size}px`,
      height: `${size}px`,
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: `hsl(${scale * 360}, 70%, 50%)`
    };
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

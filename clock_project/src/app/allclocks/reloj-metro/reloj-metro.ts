import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseClock } from '../../components/baseclock';
import { slider } from '../../components/slider/slider'; 

@Component({
  selector: 'app-meter-clock',
  templateUrl: './reloj-metro.html',
  styleUrls: ['./reloj-metro.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, slider] 
})
export class RelojMetro extends BaseClock implements OnInit, OnDestroy {
  
  userHour: number;
  userMinute: number;
  userSecond: number;
  isPM: boolean;

  private manualAdjustTimeout: any;

  constructor() {
    super();

    const now = new Date();
    this.userHour = now.getHours() % 12 || 12;
    this.userMinute = now.getMinutes();
    this.userSecond = now.getSeconds();
    this.isPM = now.getHours() >= 12;
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
    const [hours24, minutes, seconds] = this.horaActual.split(':').map(Number);

    this.userMinute = minutes;
    this.userSecond = seconds;
    this.isPM = hours24 >= 12;

    let h12 = hours24 % 12;
    this.userHour = h12 === 0 ? 12 : h12;
  }

  toggleAMPM(): void {
    this.isPM = !this.isPM;

    let newHours24 = this.userHour;
    if (this.isPM && newHours24 !== 12) { 
      newHours24 += 12;
    } else if (!this.isPM && newHours24 === 12) { 
      newHours24 = 0;
    }

    this.actualizarHoraManual({
      horas: newHours24,
      minutos: this.userMinute,
      segundos: this.userSecond
    });
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

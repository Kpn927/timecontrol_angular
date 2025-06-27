// reloj-digital.ts
import { Component } from '@angular/core';
import { BaseClock } from '../../components/baseclock';
import { slider } from '../../components/slider/slider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-digital-clock',
  templateUrl: './reloj-digital.html',
  styleUrls: ['./reloj-digital.css'],
  standalone: true,
  imports: [slider, CommonModule]
})
export class RelojDigital extends BaseClock {

  constructor() {
    super();
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

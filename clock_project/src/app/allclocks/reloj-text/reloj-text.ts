import { Component } from '@angular/core';
import { BaseClock } from '../../components/baseclock';
import { CommonModule } from '@angular/common';
import { slider } from '../../components/slider/slider';

@Component({
  selector: 'app-text-clock',
  templateUrl: './reloj-text.html',
  styleUrls: ['./reloj-text.css'],
  standalone: true,
  imports: [CommonModule, slider]
})
export class RelojText extends BaseClock {
  
  getHoraEnTexto(): string {
    const [horas, minutos] = this.horaActual.split(':').map(Number);

    const horasEnTexto = this.convertirNumeroATexto(horas);
    const minutosEnTexto = this.convertirMinutosATexto(minutos);

    return `Son las ${horasEnTexto} ${minutosEnTexto}`;
  }

  private convertirNumeroATexto(numero: number): string {
    const textos = [
      'doce', 'una', 'dos', 'tres', 'cuatro', 'cinco', 'seis',
      'siete', 'ocho', 'nueve', 'diez', 'once', 'doce'
    ];
    return textos[numero % 12] || '';
  }

  private convertirMinutosATexto(minutos: number): string {
    if (minutos === 0) {
      return 'en punto';
    } else if (minutos === 15) {
      return 'y cuarto';
    } else if (minutos === 30) {
      return 'y media';
    } else if (minutos === 45) {
      return 'menos cuarto';
    } else {
      return `y ${minutos} minutos`;
    }
  }
}
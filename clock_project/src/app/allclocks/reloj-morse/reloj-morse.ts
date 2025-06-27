import { Component } from '@angular/core';
import { BaseClock } from '../../components/baseclock';
import { CommonModule } from '@angular/common';
import { slider } from '../../components/slider/slider';

@Component({
  selector: 'app-reloj-morse',
  templateUrl: './reloj-morse.html',
  styleUrls: ['./reloj-morse.css'],
  standalone: true,
  imports: [CommonModule, slider]
})
export class RelojMorse extends BaseClock {
  // Método para convertir un número a código Morse
  toMorse(value: number): string {
    const morseNumbers = [
      '-----', // 0
      '.----', // 1
      '..---', // 2
      '...--', // 3
      '....-', // 4
      '.....', // 5
      '-....', // 6
      '--...', // 7
      '---..', // 8
      '----.'  // 9
    ];
    return value
      .toString()
      .split('')
      .map(digit => morseNumbers[parseInt(digit, 10)])
      .join(' ');
  }

  // Método para obtener la hora en código Morse
  getMorseTime(): { horas: string, minutos: string, segundos: string } {
    const [horas, minutos, segundos] = this.horaActual.split(':').map(Number);
    return {
      horas: this.toMorse(horas),
      minutos: this.toMorse(minutos),
      segundos: this.toMorse(segundos)
    };
  }
}
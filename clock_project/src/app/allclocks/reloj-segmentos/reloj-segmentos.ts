import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { slider } from '../../components/slider/slider';
import { BaseClock } from '../../components/baseclock';

@Component({
  selector: 'app-seven-segment-clock',
  templateUrl: './reloj-segmentos.html',
  styleUrls: ['./reloj-segmentos.css'],
  standalone: true,
  imports: [CommonModule, slider]
})
export class RelojSegmentos extends BaseClock {
  get timeArray(): string[] {
    return this.horaActual.split('');
  }

  segmentMap: { [key: string]: boolean[] } = {
    '0': [true, true, true, false, true, true, true],
    '1': [false, false, true, false, false, true, false],
    '2': [true, false, true, true, true, false, true],
    '3': [true, false, true, true, false, true, true],
    '4': [false, true, true, true, false, true, false],
    '5': [true, true, false, true, false, true, true],
    '6': [true, true, false, true, true, true, true],
    '7': [true, true, true, false, false, true, false],
    '8': [true, true, true, true, true, true, true],
    '9': [true, true, true, true, false, true, true],
    ':': [false, false, false, false, false, false, false],
  };

  getSegments(digit: string): boolean[] {
    return this.segmentMap[digit] || [false, false, false, false, false, false, false];
  }
}
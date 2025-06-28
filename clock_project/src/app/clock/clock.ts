import { Component } from '@angular/core';
import { CustomList } from '../components/list/custom-list/custom-list';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { RelojDigital } from '../allclocks/reloj-digital/reloj-digital';
import { RelojAnalogico } from '../allclocks/reloj-analogico/reloj-analogico';
import { RelojMorse } from '../allclocks/reloj-morse/reloj-morse';
import { Voice } from '../allclocks/voice/voice';
import { RelojText } from '../allclocks/reloj-text/reloj-text';
import { RelojMetro } from '../allclocks/reloj-metro/reloj-metro';
import { RelojProgresivo } from '../allclocks/reloj-progresivo/reloj-progresivo';
import { RelojRomano } from '../allclocks/reloj-romano/reloj-romano';
import { RelojEspiral } from '../allclocks/reloj-espiral/reloj-espiral';

@Component({
  selector: 'app-parent',
  templateUrl: './clock.html',
  standalone: true,
  imports: [CommonModule, 
    CustomList, 
    RouterModule,
    RelojDigital,
    RelojAnalogico,
    RelojMorse,
    Voice, 
    RelojText,
    RelojMetro,
    RelojProgresivo,
    RelojRomano,
    RelojEspiral
  ],
  styleUrl: './clock.css'
})

export class Clock {

  currentComponent: string | null = null; 

  ejemplo: { texto: string, ruta?: string, onClick?: () => void }[] = [
    { texto: 'Mostrar Reloj Digital', onClick: () => this.showSpecificComponent('digital-clock') }, 
    { texto: 'Mostrar Reloj Analogico', onClick: () => this.showSpecificComponent('analog-clock') },
    { texto: 'Mostrar Reloj Morse', onClick: () => this.showSpecificComponent('morse-clock') },
    { texto: 'Mostrar Voice', onClick: () => this.showSpecificComponent('voice') },
    { texto: 'Mostrar Text', onClick: () => this.showSpecificComponent('text-clock') },
    { texto: 'Mostrar Reloj metro', onClick: () => this.showSpecificComponent('meter-clock') },
    { texto: 'Mostrar Reloj Progresivo', onClick: () => this.showSpecificComponent('progress-clock') },
    { texto: 'Mostrar Reloj Romano', onClick: () => this.showSpecificComponent('roman-clock') },
    { texto: 'Mostrar Reloj Espiral', onClick: () => this.showSpecificComponent('spiral-clock') },
    { texto: 'Botón 10 (No hace nada específico)', onClick: () => this.showSpecificComponent('') }
  ];
  constructor() {}

  showSpecificComponent(componentName: string | null): void {
    this.currentComponent = componentName;
    console.log('Componente actual a mostrar:', this.currentComponent);
  }

}
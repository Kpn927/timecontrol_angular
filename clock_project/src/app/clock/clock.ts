import { Component } from '@angular/core';
import { CustomList } from '../components/list/custom-list/custom-list';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { RelojDigital } from '../allclocks/reloj-digital/reloj-digital';
import { RelojAnalogico } from '../allclocks/reloj-analogico/reloj-analogico';
import { RelojMorse } from '../allclocks/reloj-morse/reloj-morse';
import { Voice } from '../allclocks/voice/voice';
import { RelojText } from '../allclocks/reloj-text/reloj-text';

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
    RelojText
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
    { texto: 'Botón 6 (No hace nada específico)', onClick: () => this.showSpecificComponent('') },
    { texto: 'Botón 7 (No hace nada específico)', onClick: () => this.showSpecificComponent('') },
    { texto: 'Botón 8 (No hace nada específico)', onClick: () => this.showSpecificComponent('') },
    { texto: 'Botón 9 (No hace nada específico)', onClick: () => this.showSpecificComponent('') }
  ];
  constructor() {}

  showSpecificComponent(componentName: string | null): void {
    this.currentComponent = componentName;
    console.log('Componente actual a mostrar:', this.currentComponent);
  }

}
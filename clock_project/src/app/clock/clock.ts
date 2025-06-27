import { Component } from '@angular/core';
import { CustomList } from '../components/list/custom-list/custom-list';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { RelojDigital } from '../allclocks/reloj-digital/reloj-digital';
import { RelojAnalogico } from '../allclocks/reloj-analogico/reloj-analogico';

@Component({
  selector: 'app-parent',
  templateUrl: './clock.html',
  standalone: true,
  imports: [CommonModule, 
    CustomList, 
    RouterModule,
    RelojDigital,
    RelojAnalogico
  ],
  styleUrl: './clock.css'
})

export class Clock {

  currentComponent: string | null = null; 

  ejemplo: { texto: string, ruta?: string, onClick?: () => void }[] = [
    { texto: 'Mostrar Reloj Digital', onClick: () => this.showSpecificComponent('digital-clock') }, 
    { texto: 'Mostrar Reloj Analogico', onClick: () => this.showSpecificComponent('analog-clock') },
    { texto: 'Botón 3 (No hace nada específico)', onClick: () => this.showSpecificComponent('') },
    { texto: 'Botón 4 (No hace nada específico)', onClick: () => this.showSpecificComponent('') },
    { texto: 'Botón 5 (No hace nada específico)', onClick: () => this.showSpecificComponent('') },
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
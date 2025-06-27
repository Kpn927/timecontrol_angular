import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 

export interface BotonListData {
  texto: string;
  ruta?: string;
  onClick?: () => void;
}

@Component({
  selector: 'app-boton-list',
  standalone: true,
  templateUrl: './boton-custom-list.html',
  styleUrls: ['./boton-custom-list.css'],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class BotonCustomList {
  @Input() boton!: BotonListData;
  isMouseOver: boolean = false;

  constructor(private router: Router) { }

  handleMouseEnter() {
    this.isMouseOver = true;
  }

  handleMouseLeave() {
    this.isMouseOver = false;
  }

  handleClick() {
    if (this.boton.ruta) {
      this.router.navigate([this.boton.ruta]);
    }
    if (this.boton.onClick) {
      this.boton.onClick();
    }
  }
}
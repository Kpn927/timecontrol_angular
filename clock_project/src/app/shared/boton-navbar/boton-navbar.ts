import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 

export interface BotonNavbarData {
  texto: string;
  ruta?: string;
  onClick?: () => void;
  colorTexto?: string;
  CNBoton?: string;
}

@Component({
  selector: 'app-boton-navbar',
  standalone: true,
  templateUrl: './boton-navbar.html',
  styleUrls: ['./boton-navbar.css'],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class BotonNavbar {
  @Input() boton!: BotonNavbarData;
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

  get textColor(): string {
    return this.boton.colorTexto || 'black';
  }
}
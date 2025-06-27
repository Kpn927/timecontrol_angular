import { Component, Input } from '@angular/core';
import { BotonNavbarData, BotonNavbar } from '../boton-navbar/boton-navbar'; 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-navbar',
  standalone: true,
  templateUrl: './custom-navbar.html',
  styleUrls: ['./custom-navbar.css'],
  imports: [
    CommonModule,
    BotonNavbar
  ]
})
export class CustomNavbar {
  @Input() botones: BotonNavbarData[] = [];
  @Input() rutaIcono: string = '';
  @Input() titulo: string = '';
  @Input() userName: string | null = null;

  constructor(private router: Router) { }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
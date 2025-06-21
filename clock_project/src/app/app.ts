import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CustomNavbar } from './shared/custom-navbar/custom-navbar'; 

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [
    CommonModule,
    RouterOutlet,
    CustomNavbar
  ]
})
export class App {
  title = 'Relojes';
  appIconPath = '/reloj.webp';
  currentUserName: string | null = null;

  navbarButtons = [
    { texto: 'Registrar', ruta: '/register' },
    { texto: 'Login', ruta: '/login' },
    { texto: 'Cerrar Sesión', onClick: () => this.logout() }
  ];

  logout(): void {
  }
}
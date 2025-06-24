import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { CustomNavbar } from './shared/custom-navbar/custom-navbar';
import { Auth } from './auth'; // Importa tu servicio Auth
import { Subscription } from 'rxjs';

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
export class App implements OnInit, OnDestroy {
  title = 'Relojes';
  appIconPath = '/reloj.webp';
  currentUserName: string | null = null;
  navbarButtons: { texto: string, ruta?: string, onClick?: () => void }[] = [];
  private subscriptions: Subscription = new Subscription(); // Para gestionar todas las suscripciones

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private authService: Auth // Inyecta el servicio Auth
  ) {}

  ngOnInit(): void {
    // Suscribirse a los cambios en el estado de login
    this.subscriptions.add(
      this.authService.isLoggedIn$.subscribe(isLoggedIn => {
        this.updateNavbarButtons(isLoggedIn);
      })
    );

    // Suscribirse a los cambios en el nombre de usuario
    this.subscriptions.add(
      this.authService.userName$.subscribe(userName => {
        this.currentUserName = userName;
      })
    );
  }

  ngOnDestroy(): void {
    // Desuscribirse de todas las suscripciones para evitar fugas de memoria
    this.subscriptions.unsubscribe();
  }

  private updateNavbarButtons(isLoggedIn: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      if (!isLoggedIn) {
        this.navbarButtons = [
          { texto: 'Registrar', ruta: '/register' },
          { texto: 'Login', ruta: '/login' },
        ];
      } else {
        this.navbarButtons = [
          { texto: 'Inicio', ruta: '/' },
          { texto: 'Relojes', ruta: '/clocks' },
          { texto: 'Logout', onClick: () => this.logout() }
        ];
      }
    } else {
      // Para SSR o entornos no-navegador, muestra los botones de "no logueado"
      this.navbarButtons = [
        { texto: 'Registrar', ruta: '/register' },
        { texto: 'Login', ruta: '/login' },
      ];
    }
  }

  logout(): void {
    this.authService.logout(); // Llama al método logout del servicio Auth
    // La redirección a /login ya está manejada dentro del método logout del servicio.
    // Si quieres asegurarte aquí también, puedes hacerlo: this.router.navigate(['/login']);
  }
}
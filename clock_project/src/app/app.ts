import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CustomNavbar } from './components/shared/custom-navbar/custom-navbar';
import { Auth } from './auth';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

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
  private subscriptions: Subscription = new Subscription();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private authService: Auth
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.isLoggedIn$.subscribe(isLoggedIn => {
        this.updateNavbarButtons(isLoggedIn, this.router.url);
      })
    );

    this.subscriptions.add(
      this.authService.userName$.subscribe(userName => {
        this.currentUserName = userName;
      })
    );

    this.subscriptions.add(
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        this.authService.isLoggedIn$.subscribe(isLoggedIn => { 
          this.updateNavbarButtons(isLoggedIn, event.urlAfterRedirects); 
        }).unsubscribe();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private updateNavbarButtons(isLoggedIn: boolean, currentUrl: string): void {
    const isClocksRoute = currentUrl.startsWith('/clocks');

    if (isPlatformBrowser(this.platformId)) {
      if (isClocksRoute) {
        this.navbarButtons = [
          { texto: 'Inicio', ruta: '/' }
        ];
      } else if (!isLoggedIn) {
        this.navbarButtons = [
          { texto: 'Registrar', ruta: '/register' },
          { texto: 'Login', ruta: '/login' },
        ];
      } else {
        // If logged in and not on /clocks/ route
        this.navbarButtons = [
          { texto: 'Inicio', ruta: '/' },
          { texto: 'Relojes', ruta: '/clocks' },
          { texto: 'Logout', onClick: () => this.logout() }
        ];
      }
    } else {
      if (isClocksRoute) {
         this.navbarButtons = [
          { texto: 'Inicio', ruta: '/' }
        ];
      } else {
        this.navbarButtons = [
          { texto: 'Registrar', ruta: '/register' },
          { texto: 'Login', ruta: '/login' },
        ];
      }
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Auth } from '../auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  currentUserName: string | null = null;
  private subscriptions: Subscription = new Subscription();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private authService: Auth
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.subscriptions.add(
        this.authService.isLoggedIn$.subscribe(isLoggedIn => {
          this.isLoggedIn = isLoggedIn;
        })
      );

      this.subscriptions.add(
        this.authService.userName$.subscribe(userName => {
          this.currentUserName = userName;
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  navigateToClocks(): void {
    this.router.navigate(['/clocks']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class Login implements OnInit {
  email: string = '';
  password: string = '';
  error: string = '';
  loading: boolean = false;
  showPassword: boolean = false;

  constructor(private router: Router, private authService: Auth) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['']);
    }
  }

  async handleSubmit(): Promise<void> {
    this.error = '';
    this.loading = true;

    this.authService.login(this.email, this.password).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: (data) => {
        console.log('Login completado!', data);
        this.router.navigate(['/']);
      },
      error: (err: Error) => {
        this.error = err.message || 'Login fallido. Por favor revisa tus credenciales.';
        console.error('Error during login:', err);
      }
    });
  }

  handleRegisterClick(): void {
    this.router.navigate(['/register']);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
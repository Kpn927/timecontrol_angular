import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../app/auth'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrl: './register.css',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class Register {
  username!: string;
  email!: string;
  password!: string;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  showPassword = false;

  constructor(private authService: Auth, private router: Router) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onRegister(): void {
    this.errorMessage = null;
    this.successMessage = null;

    if (!this.username || !this.email || !this.password) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      return;
    }

    this.authService.register(this.username, this.email, this.password).subscribe({
      next: (response) => {
        this.successMessage = response.message || '¡Registro exitoso! Ahora puedes iniciar sesión.';
        console.log('Registration successful:', response);
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
        console.error('Registration error:', error.message);
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}

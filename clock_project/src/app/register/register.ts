// register.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf, ngFor etc.
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { Auth } from '../../app/auth'; // Adjust the path as per your project structure
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrl: './register.css',
  standalone: true, // Assuming this is a standalone component, otherwise remove
  imports: [
    CommonModule, // Required for directives like *ngIf
    FormsModule   // Required for two-way data binding [(ngModel)]
  ]
})
export class Register {
  username!: string; // Using definite assignment assertion, ensure it's bound via ngModel
  email!: string;    // Using definite assignment assertion
  password!: string; // Using definite assignment assertion
  errorMessage: string | null = null;
  successMessage: string | null = null;
  showPassword = false; // Property to toggle password visibility - THIS WAS ADDED/ENSURED

  constructor(private authService: Auth, private router: Router) {}

  /**
   * Toggles the visibility of the password field.
   */
  togglePasswordVisibility(): void { // Method to toggle password visibility - THIS WAS ADDED/ENSURED
    this.showPassword = !this.showPassword;
  }

  /**
   * Handles the registration form submission.
   * Calls the authentication service's register method.
   */
  onRegister(): void {
    this.errorMessage = null; // Clear previous errors
    this.successMessage = null; // Clear previous success messages

    // Basic client-side validation
    if (!this.username || !this.email || !this.password) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      return;
    }

    this.authService.register(this.username, this.email, this.password).subscribe({
      next: (response) => {
        // Handle successful registration
        this.successMessage = response.message || '¡Registro exitoso! Ahora puedes iniciar sesión.';
        console.log('Registration successful:', response);
        // Optionally redirect to login page after a short delay or immediately
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000); // Redirect after 2 seconds
      },
      error: (error: Error) => {
        // Handle registration error
        this.errorMessage = error.message;
        console.error('Registration error:', error.message);
      }
    });
  }

  /**
   * Handles navigation to the login page.
   */
  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}

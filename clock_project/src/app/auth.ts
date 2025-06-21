// src/app/auth.service.ts
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

interface LoginResponse {
  message: string;
  userid?: string;
  username?: string;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl = 'http://localhost:5000/api/login';

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, { email, password }).pipe(
      tap((response: LoginResponse) => {
        if (isPlatformBrowser(this.platformId)) {
          if (response.userid) {
            localStorage.setItem('userId', response.userid);
          }
          if (response.username) {
            localStorage.setItem('userName', response.username);
          }
          if (response.token) {
            localStorage.setItem('authToken', response.token);
          }
          localStorage.setItem('isLoggedIn', 'true');
        }
      }),
      catchError(this.handleAuthError)
    );
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('isLoggedIn') === 'true' && !!localStorage.getItem('authToken');
    }
    return false;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      localStorage.removeItem('authToken');
    }
    this.router.navigate(['/login']);
  }

  private handleAuthError(error: HttpErrorResponse): Observable<never> {
    console.error('Error en el servicio de autenticación:', error);

    let errorMessage = 'Ha ocurrido un error inesperado. Por favor, intenta de nuevo.';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error de red o cliente: ${error.error.message}`;
    }

    else if (error.status) {
      switch (error.status) {
        case 400: // Bad Request
          errorMessage = error.error?.message || 'Solicitud inválida. Verifica los datos.';
          break;
        case 401: // Unauthorized
        case 403: // Forbidden
          errorMessage = error.error?.message || 'Credenciales inválidas. Acceso denegado.';
          break;
        case 404: // Not Found
          errorMessage = `Endpoint no encontrado: ${error.url}`;
          break;
        case 500: // Internal Server Error
          errorMessage = error.error?.message || 'Error del servidor. Por favor, inténtalo más tarde.';
          break;
        case 0: // Likely network issue or CORS
          errorMessage = 'No se pudo conectar al servidor. Verifica tu conexión a internet o el estado del servidor.';
          break;
        default:
          errorMessage = `Error del servidor (Código ${error.status}): ${error.message || 'Desconocido'}`;
      }
    }
    else if (error.message) {
      errorMessage = `Error: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
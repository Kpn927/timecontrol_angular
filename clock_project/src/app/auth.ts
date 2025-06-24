import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
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
  private loginApiUrl = 'http://localhost:5000/api/login';
  private registerApiUrl = 'http://localhost:5000/api/register';

  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  private _userName = new BehaviorSubject<string | null>(null);

  isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();
  userName$: Observable<string | null> = this._userName.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const userName = localStorage.getItem('userName');
      this._isLoggedIn.next(loggedIn);
      this._userName.next(userName);
    }
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginApiUrl, { email, password }).pipe(
      tap((response: LoginResponse) => {
        if (isPlatformBrowser(this.platformId)) {

          localStorage.setItem('isLoggedIn', 'true');
          
          if (response.userid) {
            localStorage.setItem('userId', response.userid);
          }
          if (response.username) {
            localStorage.setItem('userName', response.username);
          }
          if (response.token) {
            localStorage.setItem('authToken', response.token);
          }

          this._isLoggedIn.next(true);
          this._userName.next(response.username || null);
        }
      }),
      catchError(this.handleAuthError)
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(this.registerApiUrl, { username, email, password }).pipe(
      catchError(this.handleAuthError)
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      localStorage.removeItem('authToken');
      this._isLoggedIn.next(false);
      this._userName.next(null);
    }
    this.router.navigate(['']);
  }

  private handleAuthError(error: HttpErrorResponse): Observable<never> {
    console.error('Error en el servicio de autenticación:', error);

    let errorMessage = 'Ha ocurrido un error inesperado. Por favor, intenta de nuevo.';

    if (error.error instanceof ErrorEvent) {
      // Error de red o cliente
      errorMessage = `Error de red o cliente: ${error.error.message}`;
    } else if (error.status) {
      // El backend devolvió un código de respuesta no exitoso.
      // El cuerpo de la respuesta puede contener pistas sobre lo que salió mal.
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
        case 0: // Probable problema de red o CORS
          errorMessage = 'No se pudo conectar al servidor. Verifica tu conexión a internet o el estado del servidor.';
          break;
        default:
          errorMessage = `Error del servidor (Código ${error.status}): ${error.message || 'Desconocido'}`;
      }
    } else if (error.message) {
      errorMessage = `Error: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage)); // Se lanza un objeto Error con el mensaje
  }
}

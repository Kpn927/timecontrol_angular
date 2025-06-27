import { Routes } from '@angular/router';
import { Register } from './register/register';
import { HomePage } from './home-page/home-page';
import { Login } from './login/login';
import { Clock } from './clock/clock';
import { RelojDigital } from './allclocks/reloj-digital/reloj-digital';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component: Register

  },
  {
    path: '',
    component: HomePage,
    pathMatch: 'full'
  },
  {
    path: 'clocks',
    component: Clock
  },
  {
    path: 'clocks/reloj-digital',
    component: RelojDigital
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
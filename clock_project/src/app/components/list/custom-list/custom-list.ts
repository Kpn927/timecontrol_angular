import { Component, Input } from '@angular/core';
import { BotonCustomList, BotonListData } from '../boton-custom-list/boton-custom-list'; 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-list',
  standalone: true,
  templateUrl: './custom-list.html',
  styleUrls: ['./custom-list.css'],
  imports: [
    CommonModule,
    BotonCustomList
  ]
})
export class CustomList {
  @Input() botones: BotonListData[] = [];
  @Input() rutaIcono: string = '/flecha-izquierda.png';
  @Input() titulo: string = '';
  @Input() userName: string | null = null;

  

  constructor(private router: Router) {}

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
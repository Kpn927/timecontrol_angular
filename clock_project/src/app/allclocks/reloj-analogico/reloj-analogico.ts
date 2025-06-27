// reloj-analogico.ts
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { BaseClock } from '../../components/baseclock';
import { slider } from '../../components/slider/slider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reloj-analogico',
  templateUrl: './reloj-analogico.html',
  styleUrls: ['./reloj-analogico.css'],
  standalone: true,
  imports: [slider, CommonModule]
})
export class RelojAnalogico extends BaseClock implements AfterViewInit {
  @ViewChild('analogClockCanvas')
  canvas!: ElementRef<HTMLCanvasElement>;

  private context!: CanvasRenderingContext2D;
  private centerX!: number;
  private centerY!: number; 
  private radius!: number; 

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d')!;
    const size = this.canvas.nativeElement.offsetWidth;
    this.canvas.nativeElement.width = size;
    this.canvas.nativeElement.height = size;

    this.centerX = this.canvas.nativeElement.width / 2;
    this.centerY = this.canvas.nativeElement.height / 2;
    this.radius = Math.min(this.centerX, this.centerY) * 0.9;

    this.actualizarHora();
  }

  protected override actualizarHora(): void {
    super.actualizarHora(); // Llama al método actualizarHora de la clase base para obtener horaActual

    if (this.context) {
      this.drawClock(); // Llama a la función de dibujo del reloj
    }
  }

  override actualizarHoraManual(event: { horas: number, minutos: number, segundos: number }): void {
    super.actualizarHoraManual(event);

    if (this.context) {
      this.drawClock(event.horas, event.minutos, event.segundos);
    }
  }

  onSliderInteraction(isStarting: boolean): void {
    if (isStarting) {
      this.comenzarAjuste();
    } else {
      this.terminarAjuste();
    }
  }

  private drawClock(h?: number, m?: number, s?: number): void {
    const context = this.context;
    const centerX = this.centerX;
    const centerY = this.centerY;
    const radius = this.radius;

    context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    // Obtener la hora actual si no se proporciona
    const now = new Date();
    const hours = h !== undefined ? h : now.getHours();
    const minutes = m !== undefined ? m : now.getMinutes();
    const seconds = s !== undefined ? s : now.getSeconds();

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    context.fillStyle = 'white';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#34495e';
    context.stroke();
    context.closePath();

    context.font = radius * 0.15 + 'px Arial'; 
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.fillStyle = '#333'; 

    for (let num = 1; num <= 12; num++) {
      const ang = num * Math.PI / 6;
      context.rotate(ang);
      context.translate(0, -radius * 0.85); // Posicionar los números
      context.rotate(-ang);
      context.fillText(num.toString(), centerX, centerY); // Dibujar el número
      context.rotate(ang);
      context.translate(0, radius * 0.85); // Volver a la posición original
      context.rotate(-ang);
    }

    // Dibuja las marcas de los minutos
    for (let i = 0; i < 60; i++) {
      const ang = (i * Math.PI / 30); // Ángulo para cada minuto
      context.beginPath();
      context.lineWidth = 2;
      context.strokeStyle = '#7f8c8d'; // Color de las marcas de minuto
      context.moveTo(centerX + radius * Math.sin(ang) * 0.95, centerY - radius * Math.cos(ang) * 0.95);
      context.lineTo(centerX + radius * Math.sin(ang) * 0.9, centerY - radius * Math.cos(ang) * 0.9);
      context.stroke();
    }


    // 4. Dibujar las manecillas
    // Función auxiliar para dibujar una manecilla
    const drawHand = (pos: number, length: number, width: number, color: string = '#2c3e50') => {
      context.beginPath();
      context.lineWidth = width;
      context.lineCap = 'round'; // Extremos redondeados
      context.strokeStyle = color;
      context.moveTo(centerX, centerY);
      context.lineTo(centerX + length * Math.sin(pos), centerY - length * Math.cos(pos));
      context.stroke();
      context.closePath();
    };

    // Calcular ángulos de las manecillas
    // Segundos: 0 a 59 segundos -> 0 a 360 grados (2*PI radianes)
    const secondAngle = ((seconds / 60) * 2 * Math.PI);
    // Minutos: 0 a 59 minutos (con segundos influenciando ligeramente)
    const minuteAngle = ((minutes / 60) * 2 * Math.PI) + ((secondAngle / 60));
    // Horas: 0 a 11 horas (con minutos influenciando ligeramente)
    const hourAngle = ((hours % 12) / 12 * 2 * Math.PI) + ((minuteAngle / 12));

    // Dibujar manecilla de la hora
    drawHand(hourAngle, radius * 0.5, radius * 0.07); // Más corta y gruesa
    // Dibujar manecilla de los minutos
    drawHand(minuteAngle, radius * 0.8, radius * 0.05); // Más larga y delgada
    // Dibujar manecilla de los segundos
    drawHand(secondAngle, radius * 0.9, radius * 0.02, '#e74c3c'); // La más larga y delgada, roja

    // 5. Dibujar el punto central
    context.beginPath();
    context.arc(centerX, centerY, radius * 0.05, 0, 2 * Math.PI);
    context.fillStyle = '#34495e'; // Punto central oscuro
    context.fill();
    context.closePath();
  }
}

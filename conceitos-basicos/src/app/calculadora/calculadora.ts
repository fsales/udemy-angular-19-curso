import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculadora',
  imports: [FormsModule, CommonModule],
  templateUrl: './calculadora.html',
  styleUrl: './calculadora.scss'
})
export class Calculadora {

  numero1: number = 0;
  numero2: number = 0;
  resultado: number = 0;

  calcularResultado(): void {
    this.resultado = this.numero1 + this.numero2;
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria.component',
  standalone: false,
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {
  form: FormGroup;
    
    constructor(
      private categoriaService: CategoriaService
    ){
      this.form = new FormGroup({
        nome: new FormControl('', [Validators.required, Validators.minLength(5)]),
        descricao: new FormControl('', [Validators.required])
      });
    }

    salvar(){
      console.log(`isvalido: ${this.form.valid}`)
      this.form.markAllAsTouched();
      
      if (this.form.valid) {
        console.log(this.form.value);
        this.categoriaService.salvar(this.form.value).subscribe({
          next: (categoria) => {
            console.log('Categoria salva com sucesso:', categoria);
            this.form.reset();
          },
          error: (error) => {
            console.error('Erro ao salvar categoria:', error);
          }
        });
      }

    }

    isCampoInvalido(
      nomeCampo: string
    ): boolean {
      const campo = this.form.get(nomeCampo);
      
      return (
          campo?.invalid && 
          campo?.touched &&
          campo?.errors?.['required']
        ) || false;
    }
}

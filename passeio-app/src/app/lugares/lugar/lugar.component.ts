import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../../categorias/categoria.component/categoria';
import { CategoriaService } from '../../categorias/categoria.service';
import { LugarService } from '../lugar.service';

@Component({
  selector: 'app-lugar',
  standalone: false,
  templateUrl: './lugar.component.html',
  styleUrl: './lugar.component.scss'
})
export class LugarComponent implements OnInit {

  camposForm: FormGroup;
  categorias: Categoria[] = [];

  constructor(
    private categoriaService: CategoriaService,
    private service: LugarService
  ) {
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      localizacao: new FormControl('', Validators.required),
      urlFoto: new FormControl('', Validators.required),
      avaliacao: new FormControl('', [Validators.required, Validators.min(1), Validators.max(5)])
    });
  }
  ngOnInit(): void {
    this.listarCategorias();
  }



  salvar() {
    this.camposForm.markAllAsTouched();
    if (this.camposForm.valid) {
      const novoLugar = this.camposForm.value;
      console.log('Novo Lugar:', novoLugar);
      // Aqui você pode adicionar a lógica para salvar o novo lugar
      this.service.salvar(this.camposForm.value).subscribe({
        next: lugar =>{
          console.log("Cadastrado com sucesso!", lugar);
          this.camposForm.reset(); // Reseta o formulário após salvar
        },
        error: erro => console.error('Ocorreu um erro', erro)
      });
      
    } else {
      console.log('Formulário inválido');
    }
  }

  isCampoInvalido(campo: string) {
    return this.camposForm.get(campo)?.invalid && this.camposForm.get(campo)?.touched;
  }

  listarCategorias() {
    this.categoriaService.listar().subscribe(categorias => {
      this.categorias = categorias;
    });
  }
}

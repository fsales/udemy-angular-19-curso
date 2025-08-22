import { Component, OnInit } from '@angular/core';
import { LugarService, FiltroLugar } from '../../lugares/lugar.service';
import { Lugar } from '../../lugares/lugar';
import { Categoria } from '../../categorias/categoria.component/categoria';
import { CategoriaService} from '../../categorias/categoria.service';

@Component({
  selector: 'app-galeria',
  standalone: false,
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.scss'
})
export class GaleriaComponent implements OnInit {

  lugares: Lugar[] = [];
  categorias: Categoria[] = [];
  filtro: FiltroLugar = {
    nome: '',
    categoria: ''
  };

  constructor(
    private lugarService: LugarService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {
    this.buscarLugares();
    this.buscarCategorias();
  }


  buscarLugares() {
    this.lugarService.listarTodos().subscribe(lugaresResponse => this.lugares = lugaresResponse);
  }

  buscarCategorias() {
    this.categoriaService.listar().subscribe(categoriasResponse => this.categorias = categoriasResponse);
  }

  totalEstrelas(lugar: Lugar): string {

    return "&#9733;".repeat(lugar.avaliacao || 0) + "&#9734;".repeat(5 - (lugar.avaliacao || 0));
  }

  filtrar() {
    this.lugarService.filtrar(this.filtro).subscribe(
      lugaresResponse => this.lugares = lugaresResponse
    );
  }
}

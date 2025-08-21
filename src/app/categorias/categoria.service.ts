import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from './categoria.component/categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor( private http: HttpClient ) {}

  salvar(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>('http://localhost:3000/categorias', categoria);
  }

  listar(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>('http://localhost:3000/categorias');
  }
}

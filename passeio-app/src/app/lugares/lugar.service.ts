import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lugar } from './lugar';
import { Observable } from 'rxjs';

export interface FiltroLugar {
  nome?: string;
  categoria?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LugarService {

  constructor(private httpClient: HttpClient){
  }

  salvar(lugar: Lugar) : Observable<Lugar> {
    return this.httpClient.post<Lugar>('http://localhost:3000/lugares', lugar);
  }

  listarTodos() : Observable<Lugar[]> {
    return this.httpClient.get<Lugar[]>('http://localhost:3000/lugares');
  }

  filtrar({ nome, categoria }: FiltroLugar): Observable<Lugar[]> {
    let params = new HttpParams();
    
    if (nome) {
      params = params.set('nome_like', nome);
    }
    if (categoria) {
      params = params.set('categoria', categoria);
    }

    console.log('Filtro aplicado:', { nome, categoria });
    console.log('URL params:', params.toString());
    
    return this.httpClient.get<Lugar[]>('http://localhost:3000/lugares', { params });
  }

}

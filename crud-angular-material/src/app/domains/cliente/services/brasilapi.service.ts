import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Estado, Municipio } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BrasilapiService {
  private apiUrl = 'https://brasilapi.com.br/api';

  constructor(
    private http: HttpClient
  ) {}

  listarUfs() : Observable<Estado[]>{
    return this.http.get<Estado[]>(`${this.apiUrl}/ibge/uf/v1`).pipe(
      map(estados => estados.sort((a, b) => a.nome.localeCompare(b.nome, undefined, { sensitivity: 'base' })))
    );
  }

  listarMunicipios(uf: string): Observable<Municipio[]> {

    return this.http.get<Municipio[]>(`${this.apiUrl}/ibge/municipios/v1/${uf}`).pipe(
      map(municipios => municipios.sort((a, b) => a.nome.localeCompare(b.nome, undefined, { sensitivity: 'base' })))
    );
  }
}

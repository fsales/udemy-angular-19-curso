import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.models';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
    
  private static readonly STORAGE_KEY = '_clientes';
  
  salvar(cliente: Cliente): void {
    const storage =  this.obterStorage();
    storage.push(cliente);

    localStorage.setItem(ClienteService.STORAGE_KEY, JSON.stringify(storage))

  }

  atualizar(cliente: Cliente) {
    const clientes = this.obterStorage();
    const index = clientes.findIndex(c => c.id === cliente.id);
    if (index !== -1) {
      clientes[index] = cliente;
      localStorage.setItem(ClienteService.STORAGE_KEY, JSON.stringify(clientes));
    }
  }

  pesquisarCliente(nome?: string) : Cliente[] {
    let clientes = this.obterStorage();
    if(nome){
      clientes = clientes.filter(cliente => 
        cliente.nome && cliente.nome.toLowerCase().includes(nome.toLowerCase())
      );
    }

    return clientes;
  }

  buscarClientePorId(id: string): Cliente | undefined {
    const clientes = this.obterStorage();
    return clientes.find(cliente => cliente.id === id);
  }

  excluir(cliente: Cliente): void {
    const clientes = this.obterStorage();
    const index = clientes.findIndex(c => c.id === cliente.id);
    if (index !== -1) {
      clientes.splice(index, 1);
      localStorage.setItem(ClienteService.STORAGE_KEY, JSON.stringify(clientes));
    }
  }

  private obterStorage(): Cliente[] {
    try {
      const data = localStorage.getItem(ClienteService.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }
}

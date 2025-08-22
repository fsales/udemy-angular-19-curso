import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ItemLista } from './itemlista';

@Component({
  selector: 'app-lista-compras',
  imports: [FormsModule, CommonModule],
  templateUrl: './lista-compras.html',
  styleUrl: './lista-compras.scss'
})
export class ListaCompras {

  item: string = '';
  itens: ItemLista[] = [];

  adicionarItem() {
    const nomeItem = this.item.trim();
    
    if (!nomeItem) {
      return;
    }

    // Verificar se o item já existe
    const itemExistente = this.itens.find(it => 
      it.nome?.toLowerCase() === nomeItem.toLowerCase()
    );
    
    if (itemExistente) {
      return;
    }

    const novoItem: ItemLista = {
      id: this.itens.length > 0 ? Math.max(...this.itens.map(i => i.id)) + 1 : 1,
      nome: nomeItem,
      comprado: false
    };
    
    this.itens.push(novoItem);
    this.item = '';
  }

  riscarItem(item: ItemLista) {
    item.comprado = !item.comprado;
  }

  limparLista() {
    this.itens = [];
  }
}

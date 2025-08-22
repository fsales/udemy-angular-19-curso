import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Cliente } from '../../models/cliente.models';
import { ClienteService } from '../../services/cliente.service';
import { NotificationService } from '../../../shared/services/notification/notification.service';


@Component({
  selector: 'app-consulta',
  imports: [
    MatInputModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatTooltipModule,
    CommonModule,
    DatePipe
  ],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent implements OnInit {

  listaClientes: Cliente[] = [];
  displayedColumns: string[] = ['id','nome', 'email', 'cpf', 'dataNascimento', 'acoes'];

  nomeBuscar: string = '';
  excluindoCliente: string | null = null;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private notificationService: NotificationService
  ){

  }

  ngOnInit(): void {
    
    this.listaClientes = this.clienteService.pesquisarCliente();
    
  }

  pesquisar(): void{
    this.listaClientes = this.clienteService.pesquisarCliente(this.nomeBuscar);
  }

  preparaEditar(id:string):void{
    this.router.navigate(['/editar'], {queryParams:{"id": id}});
  }

  preparaExcluir(clienteId: string): void {
    this.excluindoCliente = clienteId;
  }

  cancelarExclusao(): void {
    this.excluindoCliente = null;
  }

  excluir(cliente: Cliente): void {
    try {
      this.clienteService.excluir(cliente);
      this.listaClientes = this.clienteService.pesquisarCliente(this.nomeBuscar);
      this.excluindoCliente = null;
      this.notificationService.sucesso(`Cliente ${cliente.nome} excluído com sucesso!`);
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      this.notificationService.erro('Erro ao excluir cliente. Tente novamente.');
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { ClienteService } from '../../services/cliente.service';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { BrasilapiService } from '../../services/brasilapi.service';
import { Cliente, Estado, Municipio } from '../../models';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    LayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    NgxMaskDirective
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {

  cliente: Cliente = Cliente.newCliente();
  atualizando: boolean = false;

  estados: Estado[] = [];
  municipios: Municipio[] = [];

  constructor(
    private clienteService: ClienteService,
    private brasilApiService: BrasilapiService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService

  ) { }

  ngOnInit(): void {
    this.carregarDadosEdicao();

    this.carregarUfs();
  }

  carregarUfs() {
    this.brasilApiService.listarUfs().subscribe({
      next: (_estados: Estado[]) => this.estados = _estados,
      error: (error) => this.notificationService.erro('Erro ao carregar estados: ' + error.message)
    });
  }

  carregarMunicipios(event: MatSelectChange) {
    const uf: string = event.value;
    this.brasilApiService.listarMunicipios(uf).subscribe({
      next: (_municipios: Municipio[]) => this.municipios = _municipios,
      error: (error) => this.notificationService.erro('Erro ao carregar municípios: ' + error.message)
    });
  }

  salvar(form?: NgForm) {
    if (form && !form.valid) {
      if (form.controls['email'] && form.controls['email'].errors) {
        if (form.controls['email'].errors['required']) {
          this.notificationService.erro('O campo E-mail é obrigatório!');
          return;
        }
        if (form.controls['email'].errors['email']) {
          this.notificationService.erro('Digite um e-mail válido!');
          return;
        }
      }
      this.notificationService.erro('Preencha todos os campos obrigatórios!');
      return;
    }
    if (this.atualizando) {
      this.clienteService.atualizar(this.cliente);
      this.notificationService.sucesso('Cliente atualizado com sucesso!');
      this.router.navigate(['/consulta']);
    } else {
      this.clienteService.salvar(this.cliente);
      this.notificationService.sucesso('Cliente cadastrado com sucesso!');
      this.limpar(form); // Limpa o formulário após salvar
    }
  }

  limpar(form?: NgForm) {
    const id = this.cliente.id;
    this.cliente = Object.assign(Cliente.newCliente(), { id });
    if (form) {
      form.resetForm(this.cliente); // Reseta o estado do formulário e dos campos
    }
  }

  private carregarDadosEdicao(): void {
    const modo = this.route.snapshot.data['modo'];
    this.atualizando = modo === 'edicao';
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if (id && this.atualizando) {
        const clienteEncontrado = this.clienteService.buscarClientePorId(id);
        if (clienteEncontrado) {
          this.cliente = clienteEncontrado;
          if(this.cliente.uf){
            const event = { value: this.cliente.uf}
            this.carregarMunicipios(event as MatSelectChange);
          }
        }
      }
    });
  }

}

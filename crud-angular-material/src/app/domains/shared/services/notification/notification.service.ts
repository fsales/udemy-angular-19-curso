import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { NotificationType } from './notification.types';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  /**
   * Exibe uma mensagem de notificação moderna usando SnackBar nativo
   * @param mensagem - Texto da mensagem
   * @param tipo - Tipo da mensagem (sucesso, erro, aviso)
   * @param duracao - Duração em milissegundos (padrão: 4000)
   */
  mostrarMensagem(
    mensagem: string, 
    tipo: NotificationType = 'sucesso',
    duracao: number = 4000
  ): void {
    if (!mensagem || mensagem.trim() === '') {
      console.warn('Tentativa de mostrar mensagem vazia');
      return;
    }

    try {
      // Ícones modernos do Material Symbols
      const icones = {
        sucesso: '✓',
        erro: '✗', 
        aviso: '⚠'
      };

      const icon = icones[tipo] || icones.aviso;
      const mensagemComIcone = `${icon} ${mensagem}`;

      const config: MatSnackBarConfig = {
        duration: duracao,
        horizontalPosition: 'center',
        verticalPosition: 'bottom', // Mobile-first UX moderno
        panelClass: [`snackbar-${tipo}`] // Classes personalizadas
      };

      this.snackBar.open(mensagemComIcone, 'Fechar', config);

    } catch (error) {
      console.error('Erro ao exibir notificação:', error);
      // Fallback para casos extremos
      const icon = tipo === 'sucesso' ? '✅' : tipo === 'erro' ? '❌' : '⚠️';
      alert(`${icon} ${mensagem}`);
    }
  }

  /**
   * Métodos de conveniência para tipos específicos
   */
  sucesso(mensagem: string, duracao?: number): void {
    this.mostrarMensagem(mensagem, 'sucesso', duracao);
  }

  erro(mensagem: string, duracao?: number): void {
    this.mostrarMensagem(mensagem, 'erro', duracao);
  }

  aviso(mensagem: string, duracao?: number): void {
    this.mostrarMensagem(mensagem, 'aviso', duracao);
  }

  /**
   * Para mensagens persistentes (sem duração automática)
   */
  persistente(mensagem: string, tipo: NotificationType = 'aviso'): void {
    const icones = {
      sucesso: '✓',
      erro: '✗', 
      aviso: '⚠'
    };

    const icon = icones[tipo] || icones.aviso;
    const mensagemComIcone = `${icon} ${mensagem}`;

    const config: MatSnackBarConfig = {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: [`snackbar-${tipo}`]
    };

    this.snackBar.open(mensagemComIcone, 'Fechar', config);
  }
}

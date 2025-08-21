import { inject, Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { auth } from './auth.config';
import { Profile } from './landingpage/profile.model';

@Injectable({
  providedIn: 'root'
})
export class AuthgoogleService {
  // 🚀 Modern Angular: inject() functions
  private readonly oauthService = inject(OAuthService);
  private readonly router = inject(Router);
  
  // 🚀 Signals para estado reativo
  private readonly profile = signal<Profile | null>(null);
  
  // 🚀 Computed signals para valores derivados
  readonly isAuthenticated = computed(() => !!this.profile());
  readonly currentProfile = computed(() => this.profile());

  constructor() {
    this.initializeConfiguration();
  }

  // 🚀 Métodos com arrow functions e melhor tratamento de erros
  private readonly initializeConfiguration = async (): Promise<void> => {
    this.oauthService.configure(auth);
    this.oauthService.setupAutomaticSilentRefresh();
    
    try {
      await this.oauthService.loadDiscoveryDocumentAndTryLogin();
      console.log('OAuth configurado. Token válido:', this.oauthService.hasValidAccessToken());
      
      if (this.oauthService.hasValidAccessToken()) {
        this.updateProfileFromClaims();
      }
    } catch (error) {
      console.error('Erro na configuração OAuth:', error);
    }
  };

  // 🚀 Método extraído para melhor organização
  private readonly updateProfileFromClaims = (): void => {
    const claims = this.oauthService.getIdentityClaims() as any;
    console.log('Claims recebidos:', claims);
    
    if (claims?.email && claims?.name) {
      const { email, name } = claims;
      this.profile.set({ email, name });
      console.log('Perfil definido:', { email, name });
    } else {
      console.log('Claims não contêm email ou name');
    }
  };

  readonly login = (): void => {
    this.oauthService.initImplicitFlow();
  };

  // 🚀 Método para verificar callback de login - mais limpo
  readonly checkForLoginCallback = (): void => {
    if (this.oauthService.hasValidAccessToken()) {
      this.updateProfileFromClaims();
    }
  };

  readonly logout = async (): Promise<void> => {
    console.log('Fazendo logout...');
    
    try {
      // Primeiro limpa o estado local
      this.profile.set(null);
      
      // Aguarda a revogação do token completar
      await this.oauthService.revokeTokenAndLogout();
      
      // Só navega depois que tudo estiver limpo
      await this.router.navigate(['/']);
      console.log('Logout e navegação concluídos');
      
    } catch (error) {
      console.error('Erro durante logout:', error);
      // Mesmo com erro, força navegação e limpeza
      this.profile.set(null);
      await this.router.navigate(['/']);
    }
  };

  // 🚀 Métodos legados mantidos para compatibilidade (mas usando computed signals)
  readonly isLoggedIn = (): boolean => this.isAuthenticated();
  readonly getProfile = (): Profile | null => this.currentProfile();
}

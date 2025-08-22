import { Component, OnInit, ChangeDetectorRef, OnDestroy, inject, computed, signal } from '@angular/core';
import { Profile } from './profile.model';
import { Router } from '@angular/router';
import { AuthgoogleService } from '../authgoogle.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-landingpage',
  standalone: false,
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent implements OnInit {
  // 🚀 Modern Angular: inject() function
  private readonly router = inject(Router);
  private readonly authService = inject(AuthgoogleService);
  private readonly cdr = inject(ChangeDetectorRef);

  // 🚀 Computed signals para reatividade automática
  readonly isAuthenticated = computed(() => this.authService.isLoggedIn());
  readonly userProfile = computed(() => this.authService.getProfile());

  constructor() {
    // 🚀 takeUntilDestroyed - sem necessidade de OnDestroy manual
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntilDestroyed()
    ).subscribe(() => this.cdr.markForCheck());
  }

  ngOnInit(): void {
    // 🚀 Verificar callback de login de forma mais limpa
    this.authService.checkForLoginCallback();
  }

  // 🚀 Arrow functions + async/await
  readonly navigateToGallery = (): void => {
    this.router.navigate(['/paginas/galeria']);
  };

  readonly loginWithGoogle = (): void => {
    this.authService.login();
  };

  readonly logout = async (): Promise<void> => {
    await this.authService.logout();
  };

  // 🚀 Getters usando computed signals (já definidos acima)
  // Removidos os métodos redundantes isLoggedIn() e profile()
}

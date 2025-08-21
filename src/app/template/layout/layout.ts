import { Component, OnInit, inject, signal } from '@angular/core';
import { LayoutProps } from './layoutprops';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AuthgoogleService } from '../../authgoogle.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout implements OnInit {
  // 🚀 Modern Angular: inject() functions
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly authGoogleService = inject(AuthgoogleService);

  // 🚀 Signal para estado reativo
  readonly props = signal<LayoutProps>({
    titulo: '',
    subtitulo: ''
  });

  constructor() {
    // 🚀 takeUntilDestroyed - sem necessidade de OnDestroy manual
    this.initializeRouteListener();
  }

  ngOnInit(): void {
    // Método vazio - inicialização já feita no constructor
  }

  // 🚀 Arrow function + async
  readonly logout = async (): Promise<void> => {
    await this.authGoogleService.logout();
  };

  private readonly initializeRouteListener = (): void => {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.extractRouteData()),
      takeUntilDestroyed()
    ).subscribe(props => this.props.set(props));
  };

  // 🚀 Arrow function com type safety melhorado
  private readonly extractRouteData = (): LayoutProps => {
    const getDeepestRoute = (route: ActivatedRoute): ActivatedRoute => 
      route.firstChild ? getDeepestRoute(route.firstChild) : route;

    const routeData = getDeepestRoute(this.activatedRoute).snapshot.data;
    return {
      titulo: routeData?.['titulo'] || '',
      subtitulo: routeData?.['subtitulo'] || ''
    };
  };
}

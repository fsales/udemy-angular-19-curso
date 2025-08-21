import { CanActivateFn, Router } from '@angular/router';
import { AuthgoogleService } from './authgoogle.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const authgoogleService: AuthgoogleService = inject(AuthgoogleService);
  const router: Router = inject(Router);
  const isLoggedIn: boolean = authgoogleService.isLoggedIn();
  
  if (!isLoggedIn) {
    router.navigate(['/']);
  }

  return isLoggedIn;
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
    // Vérifie si le code s'exécute côté client (navigateur)
    const isBrowser = typeof window !== 'undefined';

    // Récupère le token uniquement si on est côté client
    const token = isBrowser ? localStorage.getItem('token') : null;
    // Si le token n'est pas présent alors retour sur login
  if(!token){
      router.navigateByUrl("/login");
      return false;
  }
  return true;
};

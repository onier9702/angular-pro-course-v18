import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'pokemons',
    loadComponent: () => import('./pages/pokemons/pokemons.component'),
  },
  {
    path: 'pokemons/:id',
    loadComponent: () => import('./pages/one-pokemon/one-pokemon.component'),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component'),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component'),
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing/pricing.component'),
  },

  {
    path: '**',
    redirectTo: () => {
      // const authService = inject(AuthService)

      return 'about';
    },
  }

];

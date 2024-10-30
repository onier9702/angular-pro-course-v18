import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./admin/layouts/admin-layout/admin-layout.component'),
    children: [
      {
        path: '',
        loadComponent: () => import('./admin/pages/summary/summary.component'),
      },
      {
        path: 'projects',
        loadComponent: () => import('./admin/pages/projects/projects.component'),
      },
    ]
  }
];

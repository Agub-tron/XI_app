import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'poster-generator',
    loadChildren: () =>
      import('./poster-generator/poster-generator.routes').then((m) => m.POSTER_GENERATOR_ROUTES),
  },
  {
    path: '',
    redirectTo: 'poster-generator',
    pathMatch: 'full',
  },
];

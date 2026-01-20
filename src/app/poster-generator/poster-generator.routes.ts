import { Routes } from '@angular/router';
import { OfficialPanelComponent } from './official-panel/official-panel.component';

export const POSTER_GENERATOR_ROUTES: Routes = [
  {
    path: 'official-panel',
    component: OfficialPanelComponent,
  },
  {
    path: '',
    redirectTo: 'official-panel',
    pathMatch: 'full',
  },
];

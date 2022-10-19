import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgendaModule } from './components/agenda/agenda.module';

const routes: Routes = [
  { 
    path: 'Agenda',
    loadChildren: () => import('./components/agenda/agenda.module').then(m => m.AgendaModule)
  },
  {
    path: 'Agenda',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}

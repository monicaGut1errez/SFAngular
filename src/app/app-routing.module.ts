import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgendaModule } from './components/agenda/agenda.module';

//import { AgendaComponent } from './components/agenda/agenda.component'

const routes: Routes = [
  { 
    path: 'Agenda',
    loadChildren: () => import('./components/agenda/agenda.module').then(m => m.AgendaModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}

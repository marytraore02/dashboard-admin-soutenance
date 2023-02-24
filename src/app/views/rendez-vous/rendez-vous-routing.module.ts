import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RendezVousComponent } from './rendez-vous.component';

const routes: Routes = [
  {
    path: '',
    component: RendezVousComponent,
    data: {
      title: 'Rendez-vous',
    },
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RendezVousRoutingModule {}

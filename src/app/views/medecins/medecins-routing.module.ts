import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedecinsComponent } from './medecins.component';

const routes: Routes = [
  {
    path: '',
    component: MedecinsComponent,
    data: {
      title: 'Medecins'
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedecinsRoutingModule { }

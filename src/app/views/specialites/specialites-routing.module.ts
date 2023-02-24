import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecialitesComponent } from './specialites.component';


const routes: Routes = [
  {
    path: '',
    component: SpecialitesComponent,
    data: {
      title: 'Specialites'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialitesRoutingModule { }

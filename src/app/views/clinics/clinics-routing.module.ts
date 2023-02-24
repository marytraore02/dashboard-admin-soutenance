import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClinicsComponent } from './clinics/clinics.component';
import { CliniqueComponent } from './clinique/clinique.component';
import { DetailmedecinComponent } from './detailmedecin/detailmedecin.component';
import { MapsComponent } from './maps/maps.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Clinique',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'clinique',
      }, 
      {
        path: 'maps',
        component: MapsComponent,
        data: {
          title: 'Maps',
        },
      },
      {
        path: 'clinics',
        component: ClinicsComponent,
        data: {
          title: 'Clinics',
        },
      },
      {
        path: 'clinique',
        component: CliniqueComponent,
        data: {
          title: 'Clinique',
        },
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClinicsRoutingModule {}

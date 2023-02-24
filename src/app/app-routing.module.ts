import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
// import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { GuardGuard } from './guard/guard.guard';

import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { ConnexionComponent } from './views/pages/connexion/connexion.component';
import { DetailcliniqueComponent } from './views/clinics/detailclinique/detailclinique.component';
import { DetailmedecinComponent } from './views/clinics/detailmedecin/detailmedecin.component';
import { ModifierSpecialiteComponent } from './views/specialites/modifier-specialite/modifier-specialite.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    //canActivate: [GuardGuard],
    data: {
      title: 'Dashboard'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'clinics',
        loadChildren: () =>
          import('./views/clinics/clinics.module').then((m) => m.ClinicsModule)
      },
      {
        path: 'clinique',
        loadChildren: () =>
          import('./views/clinics/clinics.module').then((m) => m.ClinicsModule)
      },
      {
        path: 'medecins',
        loadChildren: () =>
          import('./views/medecins/medecins.module').then((m) => m.MedecinsModule)
      },
      {
        path: 'patients',
        loadChildren: () =>
          import('./views/patients/patients.module').then((m) => m.PatientsModule)
      },
      {
        path: 'rendez-vous',
        loadChildren: () =>
          import('./views/rendez-vous/rendez-vous.module').then((m) => m.RendezVousModule)
      },
      {
        path: 'specialites',
        loadChildren: () =>
          import('./views/specialites/specialites.module').then((m) => m.SpecialitesModule)
      },
      {
        path: 'base',
        loadChildren: () =>
          import('./views/base/base.module').then((m) => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./views/buttons/buttons.module').then((m) => m.ButtonsModule)
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./views/forms/forms.module').then((m) => m.CoreUIFormsModule)
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/charts.module').then((m) => m.ChartsModule)
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/notifications.module').then((m) => m.NotificationsModule)
      },
      {
        path: 'message',
        loadChildren: () =>
          import('./views/message/message.module').then((m) => m.MessageModule)
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
      { 
        path: 'profile', 
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule)
      },
      { 
        path: 'feedback', 
        loadChildren: () =>
          import('./views/feedback/feedback.module').then((m) => m.FeedbackModule)
      },
      {
        path: 'modifier-specialites/:id',
        component: ModifierSpecialiteComponent

      },
      {
        path: 'detailclinique/:id',
        component: DetailcliniqueComponent
      },
      {
        path: 'detailmedecin/:id',
        component: DetailmedecinComponent
      },
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'connexion',
    component: ConnexionComponent,
    data: {
      title: 'Connexion Page'
    }
  },
  {
    path: 'register-success',
    component: BoardUserComponent,
    data: {
      title: 'Register-success Page'
    }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Home Page'
    }
  },
  { path: 'register', component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
 
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },

  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

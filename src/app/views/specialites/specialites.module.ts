import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialitesRoutingModule } from './specialites-routing.module';
import { SpecialitesComponent } from './specialites.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { cilList, cilShieldAlt } from '@coreui/icons';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import {
  AlertModule,
  AvatarModule,
  BadgeModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  NavModule,
  PaginationModule,
  ProgressModule,
  SharedModule,
  TableModule,
  TabsModule,
  WidgetModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { WidgetsModule } from '../widgets/widgets.module';
import { ChartsRoutingModule } from '../charts/charts-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { WidgetsRoutingModule } from '../widgets/widgets-routing.module';
import { ModifierSpecialiteComponent } from './modifier-specialite/modifier-specialite.component';


@NgModule({
  declarations: [
    SpecialitesComponent,
    ModifierSpecialiteComponent
  ],
  imports: [
    CommonModule,
    SpecialitesRoutingModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    FormsModule,
    HttpClientModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,
    //WidgetsModule,
    CommonModule,
    ChartsRoutingModule,
    ChartjsModule,
    CardModule,
    GridModule,
    BadgeModule,
    PaginationModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    DocsComponentsModule,
    WidgetsRoutingModule,
    WidgetModule,
    DropdownModule,
    SharedModule,
    AlertModule
  ]
  
})
export class SpecialitesModule { }

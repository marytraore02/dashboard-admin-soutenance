import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RendezVousRoutingModule } from './rendez-vous-routing.module';
import { RendezVousComponent } from './rendez-vous.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { cilList, cilShieldAlt } from '@coreui/icons';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClientModule } from '@angular/common/http';


import {
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
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { WidgetsRoutingModule } from '../widgets/widgets-routing.module';

@NgModule({
  declarations: [
    RendezVousComponent
  ],
  imports: [
    CommonModule,
    RendezVousRoutingModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
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
    DocsComponentsModule,
    PaginationModule,
    WidgetsRoutingModule,
    WidgetModule,
    DropdownModule,
    SharedModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
})
export class RendezVousModule { }

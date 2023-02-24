import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { cilList, cilShieldAlt } from '@coreui/icons';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClientModule } from '@angular/common/http';


import {
  AlertModule,
  AvatarModule,
  BadgeModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  CarouselModule,
  DropdownModule,
  FormModule,
  GridModule,
  ModalModule,
  NavModule,
  PaginationModule,
  ProgressModule,
  SharedModule,
  TableModule,
  TabsModule,
  ToastModule,
  WidgetModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { ClinicsRoutingModule } from './clinics-routing.module';

import { WidgetsModule } from '../widgets/widgets.module';
import { ChartsRoutingModule } from '../charts/charts-routing.module';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { WidgetsRoutingModule } from '../widgets/widgets-routing.module';
import { MapsComponent } from './maps/maps.component';
import { ClinicsComponent } from './clinics/clinics.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { BrowserModule, Title } from '@angular/platform-browser';
import { CliniqueComponent } from './clinique/clinique.component';
import { DetailcliniqueComponent } from './detailclinique/detailclinique.component';
import { DetailmedecinComponent } from './detailmedecin/detailmedecin.component';



@NgModule({
  declarations: [ClinicsComponent, MapsComponent, CliniqueComponent, DetailcliniqueComponent, DetailmedecinComponent],
  imports: [
    ClinicsRoutingModule,
    CardModule,
    LeafletModule,
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
    Ng2SearchPipeModule,
    ModalModule,
    ToastModule,
    AlertModule,
    CarouselModule
  ],
})
export class ClinicsModule {
}

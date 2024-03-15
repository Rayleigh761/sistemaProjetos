import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { GridComponent } from './components/grid/grid.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalInfosComponent } from './components/modal-infos/modal-infos.component';
import { InfosProjetosComponent } from './components/infos-projetos/infos-projetos.component';

@NgModule({
  declarations: [
    GridComponent,
    ModalInfosComponent,
    InfosProjetosComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material/material.module';
import { GridComponent } from './features/dashboard/components/grid/grid.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ModalInfosComponent } from "./features/dashboard/components/modal-infos/modal-infos.component";
import { InfosProjetosComponent } from './features/dashboard/components/infos-projetos/infos-projetos.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
      AppComponent,
      GridComponent,
      ModalInfosComponent,
      InfosProjetosComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      HttpClientModule,
      MaterialModule,
      ReactiveFormsModule,
    ]
})
export class AppModule { }

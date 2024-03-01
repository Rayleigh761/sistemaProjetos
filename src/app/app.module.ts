import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material/material.module';
import { GridComponent } from './features/components/grid/grid.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ModalInfosComponent } from "./features/components/modal-infos/modal-infos.component";
import { InfosProjetosComponent } from './features/components/infos-projetos/infos-projetos.component';


@NgModule({
    declarations: [
      AppComponent,
      GridComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      HttpClientModule,
      ModalInfosComponent,
      MaterialModule,
    ]
})
export class AppModule { }

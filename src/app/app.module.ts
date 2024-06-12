import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToolbarComponent } from './commom/components/toolbar/toolbar.component';
import { LOCALE_ID } from '@angular/core';
import { FooterComponent } from './commom/components/footer/footer.component';
import { NavComponent } from './commom/components/nav/nav.component';


@NgModule({
    declarations: [
      AppComponent,
      ToolbarComponent,
      FooterComponent,
      NavComponent
    ],
    providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
    bootstrap: [AppComponent],
    imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      HttpClientModule,
      MaterialModule
    ]
})
export class AppModule { }

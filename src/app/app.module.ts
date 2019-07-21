import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ObservablePlaceholderModule } from './components/observable-placeholder/observable-placeholder.module';
import { JsonContentModule } from './components/json-content/json-content.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ObservablePlaceholderModule,
    JsonContentModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

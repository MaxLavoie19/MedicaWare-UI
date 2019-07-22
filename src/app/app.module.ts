import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ObservablePlaceholderModule } from './components/observable-placeholder/observable-placeholder.module';
import { JsonContentModule } from './components/json-content/json-content.module';
import { MatFormFieldModule, MatButtonModule, MatInputModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { SocketService } from './services/socket/socket.service';

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
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})

export class AppModule { }

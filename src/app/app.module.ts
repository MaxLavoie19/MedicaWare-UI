import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatFormFieldModule, MatButtonModule, MatInputModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { JsonTreeModule } from 'src/app/components/json-tree/json-tree.module';
import { VisitLoaderService } from 'src/app/services/visit-loader/visit-loader.service';
import { SocketService } from 'src/app/services/socket/socket.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    JsonTreeModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
  ],
  providers: [SocketService, VisitLoaderService],
  bootstrap: [AppComponent]
})

export class AppModule { }

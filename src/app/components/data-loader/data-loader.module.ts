import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataLoaderComponent } from './data-loader.component';
import { SocketService } from 'src/app/services/socket/socket.service';
import { VisitLoaderService } from 'src/app/services/visit-loader/visit-loader.service';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JsonTreeModule } from 'src/app/components/json-tree/json-tree.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    JsonTreeModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
  ],
  providers: [SocketService, VisitLoaderService],
  declarations: [DataLoaderComponent]
})
export class DataLoaderModule { }

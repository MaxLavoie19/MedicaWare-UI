import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material';

import { JsonTreeComponent } from './json-tree.component';
import { MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  declarations: [JsonTreeComponent],
  exports: [JsonTreeComponent],
})
export class JsonTreeModule { }

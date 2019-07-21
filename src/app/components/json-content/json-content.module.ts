import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';

import { JsonContentComponent } from './json-content.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
  ],
  declarations: [JsonContentComponent],
  exports: [JsonContentComponent],
})
export class JsonContentModule { }

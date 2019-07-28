import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material';

import { JsonContentComponent } from 'src/app/components/json-tree/json-content/json-content.component';
import { JsonTreeComponent } from './json-tree.component';
import { ObservablePlaceholderComponent } from 'src/app/components/json-tree/observable-placeholder/observable-placeholder.component';
import { MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  declarations: [JsonTreeComponent, JsonContentComponent, ObservablePlaceholderComponent],
  exports: [JsonTreeComponent],
})
export class JsonTreeModule { }

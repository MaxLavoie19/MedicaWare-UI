import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material';

import { ObservablePlaceholderComponent } from './observable-placeholder.component';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
  ],
  declarations: [ObservablePlaceholderComponent],
  exports: [ObservablePlaceholderComponent],
})
export class ObservablePlaceholderModule { }

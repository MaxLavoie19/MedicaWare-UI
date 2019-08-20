import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Apache4CalculatorComponent } from 'src/app/components/apache-4-calculator/apache-4-calculator.component';
import { DataLoaderComponent } from 'src/app/components/data-loader/data-loader.component';

const routes: Routes = [
  { path: 'apache', component: Apache4CalculatorComponent },
  { path: 'loader', component: DataLoaderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

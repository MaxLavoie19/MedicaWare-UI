import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Apache4CalculatorModule } from 'src/app/components/apache-4-calculator/apache-4-calculator.module';
import { DataLoaderModule } from 'src/app/components/data-loader/data-loader.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Apache4CalculatorModule,
    DataLoaderModule,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

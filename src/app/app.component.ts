import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MedicaWare-UI';
  loadingVisits = [
    {name: 'test1'},
    {name: 'test2'},
  ];
  loadedVisits = [
    {name: 'test3', value: 'result 3'},
    {name: 'test4',  value: 'result 4'},
  ];
}

import { Component, OnInit } from '@angular/core';
import { VisitLoaderService } from 'src/app/services/visit-loader/visit-loader.service';
import { VisitToJsonService } from 'src/app/services/visit-to-json/visit-to-json.service';

@Component({
  selector: 'app-data-loader',
  templateUrl: './data-loader.component.html',
  styleUrls: ['./data-loader.component.css']
})
export class DataLoaderComponent {

  title = 'MedicaWare-UI';
  public visit: any;
  constructor(
    private visitLoader: VisitLoaderService, private visitSaver: VisitToJsonService
  ) { }

  fetchVisit(visitId: string) {
    this.visit = this.visitLoader.getVisit(visitId);
    const jsonObservable = this.visitSaver.toJson(this.visit);
    jsonObservable.subscribe((json) => {
      console.log(JSON.stringify(json));
    });
  }

}

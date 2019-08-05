import { Component } from '@angular/core';
import { VisitLoaderService } from 'src/app/services/visit-loader/visit-loader.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { VisitToJsonService } from 'src/app/services/visit-to-json/visit-to-json.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MedicaWare-UI';
  public visit: any;
  constructor(private visitLoader: VisitLoaderService, private visitSaver: VisitToJsonService) { }

  fetchVisit(visitId: string) {
    this.visit = this.visitLoader.getVisit(visitId);
    const jsonObservable = this.visitSaver.toJson(this.visit);
    jsonObservable.subscribe((json) => {
      console.log(json);
    });
  }
}

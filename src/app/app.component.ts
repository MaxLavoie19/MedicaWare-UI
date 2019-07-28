import { Component, OnInit } from '@angular/core';
import { VisitLoaderService } from 'src/app/services/visit-loader/visit-loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MedicaWare-UI';
  visitObservable: Observable<any>;

  constructor(private visitLoader: VisitLoaderService) { }

  ngOnInit() {
    this.visitObservable = this.visitLoader.visitObservable;
  }

  fetchVisit(visitId: string) {
    this.visitLoader.updateVisit(visitId);
  }
}

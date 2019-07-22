import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketService } from './services/socket/socket.service';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MedicaWare-UI';
  loadingVisits = [
    {name: 'test1'},
    {name: 'test2'},
  ];
  loadedVisits = [
    {name: 'test3', value: 'result 3'},
    {name: 'test4',  value: 'result 4'},
  ];

  private updateObservable: Observable<any>;
  private subscriptions: Subscription[] = [];

  constructor(private http: HttpClient, private socketService: SocketService) {}

  ngOnInit(): void {
    this.initIoConnection();
  }

  private initIoConnection(): void {
    this.socketService.initSocket();
    this.updateObservable = this.socketService.onUpdate();
  }

  fetchVisit(visit: string): void {
    const visitNumber = Number(visit);
    this.http.get(`http://localhost:4040/visit/${visitNumber}`).subscribe((result: any) => {
      const guid = result._guid;
      this.socketService.subscribe(guid);
      this.subscriptions.push(
        this.updateObservable
        .pipe(filter(x => x._guid === guid))
        .subscribe((update) => {
          console.log(update);  // TODO: update the tree on the client side
        })
      );
    });
  }
}

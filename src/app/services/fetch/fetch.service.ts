import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { SocketService } from 'src/app/services/socket/socket.service';

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  private updateObservable: Observable<any>;

  constructor(private http: HttpClient, private socketService: SocketService) {
    this.updateObservable = this.socketService.onUpdate();
  }

  fetch(url: string, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<unknown> {
    return new Observable((observer) => {
      this.http.get(url, options).subscribe((result: any) => {
        const guid = result.guid;
        this.getEventUpdate(guid).subscribe(observer.next.bind(observer));
      });
    });
  }

  initIoConnection(): void {
    this.socketService.initSocket();
  }

  private getEventUpdate(guid: string): Observable<unknown> {
    this.socketService.subscribe(guid);
    return this.updateObservable.pipe(
      filter(x => x.guid === guid),
      map(x => x.value),
    );
  }

}

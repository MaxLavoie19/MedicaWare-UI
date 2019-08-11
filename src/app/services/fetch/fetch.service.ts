import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Observable, Subject, AsyncSubject } from 'rxjs';
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

  fetch<T = any>(url: string, options?: {
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
  }): Observable<T> {
    const asyncSubject = new AsyncSubject<any>();
    this.http.get(url, options).subscribe((result: any) => {
      const guid = result.guid;
      this.getEventUpdate(guid).subscribe((value: any) => {
        asyncSubject.next(value);
        asyncSubject.complete();
      });
    });
    return asyncSubject.asObservable();
  }

  initIoConnection(): void {
    this.socketService.initSocket();
  }

  private getEventUpdate(guid: string): Observable<any> {
    this.socketService.subscribe(guid);
    return this.updateObservable.pipe(
      filter(x => x.guid === guid),
      map(x => x.value),
    );
  }

}

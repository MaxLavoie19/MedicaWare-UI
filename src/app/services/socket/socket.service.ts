import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://localhost:4040';

@Injectable()
export class SocketService {
  private socket;

  public initSocket(): void {
    this.socket = socketIo(SERVER_URL);
  }

  public subscribe(guid: string): void {
    this.socket.emit('subscribe', guid);
  }

  public onUpdate(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('update', (guid: string) => {
        observer.next(guid);
      });
    });
  }
}

import { Injectable } from '@angular/core';
import { Observable, AsyncSubject } from 'rxjs';
import { typeOf } from 'src/app/utils/typeGetter';

@Injectable({
  providedIn: 'root'
})
export class VisitToJsonService {
  constructor() { }
  toJson(visit: Observable<any>): Observable<any> {
    let tempJson: { [name: string]: any };
    const json: { [name: string]: any } = {};
    const jsonSubject = new AsyncSubject();
    visit.subscribe({
      next: () => {
        visit.subscribe((visitValue) => {
          tempJson = visitValue;
        });
      },
      complete: () => {
        const myMap = Object.keys(tempJson).map((x) => [x, typeOf(tempJson[x])]);
        Object.keys(tempJson).forEach((key) => {
          const member = tempJson[key];
          if (typeOf(member) === 'Observable') {
            member.subscribe((memberValue) => {
              json[key] = memberValue;
            });
          } else {
            json[key] = member;
          }
        });
        jsonSubject.next(json);
        jsonSubject.complete();
      },
    });
    return jsonSubject.asObservable();
  }
}

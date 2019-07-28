import { Component, Input, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { typeOf } from 'src/app/utils/typeGetter';

@Component({
  selector: 'json-tree',
  templateUrl: './json-tree.component.html',
  styleUrls: ['./json-tree.component.css']
})
export class JsonTreeComponent implements OnInit {
  private keysObservable = new BehaviorSubject([]);
  @Input() public observable: Observable<any>;

  constructor() { }

  ngOnInit() {
    this.observable.subscribe((value) => {
      if (value) {
        if (value instanceof Observable) {
          this.keysObservable.next([]);
        } else {
          this.keysObservable.next(Object.keys(value));
        }
      } else {
        this.keysObservable.next([]);
      }
    });
  }

  public get keys() {
    return this.keysObservable.asObservable();
  }

  getItem(key: string) {
    return this.observable.pipe(map(value => value[key]));
  }

  typeOf(item: any) {
    return typeOf(item);
  }
}

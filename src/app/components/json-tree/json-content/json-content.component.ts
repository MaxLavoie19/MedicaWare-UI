import { Component, Input } from '@angular/core';
import { typeOf } from 'src/app/utils/typeGetter';
import { of } from 'rxjs';

@Component({
  selector: 'json-content',
  templateUrl: './json-content.component.html',
  styleUrls: ['./json-content.component.css']
})
export class JsonContentComponent {
  @Input() public name: string;
  @Input() public value: string;

  constructor() { }

  typeOf(value: any): string {
    const type = typeOf(value);
    return type;
  }

  of(value: any) {
    return of(value);
  }
}

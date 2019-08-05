import { Component, Input } from '@angular/core';

import { typeOf } from 'src/app/utils/typeGetter';

@Component({
  selector: 'json-tree',
  templateUrl: './json-tree.component.html',
  styleUrls: ['./json-tree.component.scss'],
})
export class JsonTreeComponent {
  public type: string;
  public isLoading = false;

  @Input()
  set value(value: any) {
    this.type = typeOf(value);
    if (this.type === 'Observable') {
      this.isLoading = true;
      this.currentValue = 'Loading...';
      value.subscribe({
        next: (newValue) => {
          this.currentValue = newValue;
          this.type = typeOf(newValue);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    } else {
      this.currentValue = value;
    }
  }

  @Input() public name: string;
  public currentValue: any;

  constructor() { }

  getItem(item, key): any {
    const member = item[key];
    return member;
  }

  getKeys(item): string[] {
    const keys = Object.keys(item);
    return keys;
  }
}

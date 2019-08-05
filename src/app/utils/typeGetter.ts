import { Observable } from 'rxjs';

export function typeOf(item: any): string {
  let type: string;
  if (item === undefined) {
    type = 'undefined';
  } else if (item === null) {
    type = 'null';
  } else {
    type = (typeof item).toString();
    if (type === 'object') {
      if (item instanceof Observable) {
        type = 'Observable';
      } else if (item instanceof Array) {
        type = 'Array';
      }
    }
  }
  return type;
}

import { Observable } from 'rxjs';

export function typeOf(item: any) {
  let type = (typeof item).toString();
  if (type === 'object') {
    if (item instanceof Observable) {
      type = 'Observable';
    } else if (item instanceof Array) {
      type = 'Array';
    }
  }
  return type;
}

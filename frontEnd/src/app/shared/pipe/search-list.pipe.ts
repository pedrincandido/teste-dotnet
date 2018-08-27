import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchList'
})
export class SearchListPipe implements PipeTransform {

  transform(items: any[], criteria: any): any {
    if (!items) { return []; }
    if (!criteria) { return items; }
    return items.filter(item => {
      for (const key in item) {
        if (('' + item[key]).replace(/\W+/g, '').toLowerCase().includes(criteria)) {
          return true;
        }
      }
      return false;
    });
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'workFilter'
})
export class WorkFilterPipe implements PipeTransform {

  transform(value: any, categ: any, type: any, change?: any): any {
    let newValue: any[];
    if (type && categ.length) {
      newValue = value.filter((e: any) => categ?.some((item: any) => item.id == e.category))
    } else {
      newValue = JSON.parse(JSON.stringify(value));
    }
    newValue?.sort((a: any, b: any) => {
      const dateA = a.date ? new Date(a.date).getTime() : -Infinity;
      const dateB = b.date ? new Date(b.date).getTime() : -Infinity;
      return dateB - dateA; // use dateA - dateBand + Infinity for Ascending order!!!
    });
    return newValue;
  }

}

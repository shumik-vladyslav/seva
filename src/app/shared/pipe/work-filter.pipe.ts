import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'workFilter'
})
export class WorkFilterPipe implements PipeTransform {

  transform(value: any, categ: any, type: any , change?: any): any {
    let newValue

    if(type && categ.length){
      newValue = value.filter((e:any)=> categ?.some((item:any) => item.id == e.category))
    }
    else{
      newValue = JSON.parse(JSON.stringify(value))
    }
    return newValue;
  }

}

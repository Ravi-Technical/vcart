import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args:any): unknown {
    if(!value) return null;
    if(!args) return value;
    args = args.toLoweCase();
    return value.filter(function(item){
      return JSON.stringify(item).toLocaleLowerCase().includes(args);
    })

  }

}

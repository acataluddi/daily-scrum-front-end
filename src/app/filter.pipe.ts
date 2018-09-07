import { Pipe, PipeTransform } from '@angular/core';
import { MemberTask } from './model/task-model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: MemberTask[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toLowerCase();
return items.filter( it => {
      return it.member_name.toLowerCase().includes(searchText);
    });
   }
}
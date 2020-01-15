import { Pipe, PipeTransform } from '@angular/core';
import { Member } from './model/member-model';

@Pipe({
  name: 'UserListfilter'
})
export class UserListFilterPipe implements PipeTransform {

  string: any;
  transform(items: Member[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    this.string = items.filter(it => {
      return it.name.toLowerCase().includes(searchText);
    });
    return items.filter(it => {
      return it.name.toLowerCase().includes(searchText);
    });
  }
}
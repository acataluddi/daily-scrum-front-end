import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from './model/member-model';

@Pipe({
  name: 'filterPipe'
})
export class FilterEmail implements PipeTransform {
  transform(items: Employee[], searchText: string): any[] {
      
    if (!items) return [];
    if (!searchText) return items;
    return items.filter(it => {
      return it.companyEmail.includes(searchText);
    });
  }
}
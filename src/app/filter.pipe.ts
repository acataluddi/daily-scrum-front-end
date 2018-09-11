import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], Email: string): any[] {
    // console.log(items);
    //   console.log(Email);
      console.log(items.filter( it => it.userType));
      console.log(items.filter( it => {
        it.email.includes(Email)}));
    if(!items) return [];
    if(!Email) return items;
    Email = Email.toLowerCase();
return items.filter( it => {
      return it.userType.toLowerCase().includes("Admin");
    });
   }
}
// .toLowerCase().includes(Email)}
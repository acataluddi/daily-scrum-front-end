import { PipeTransform, Pipe } from "@angular/core";
import { NavBarMember } from "./model/nav-bar-member";

@Pipe({
  name: 'feedbacklistfilter'
})
export class FeedbackFilterPipe implements PipeTransform {
  transform(items: NavBarMember[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it.memberName.toLowerCase().includes(searchText);
    });
  }
}

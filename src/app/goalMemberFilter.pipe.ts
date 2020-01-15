import { Pipe, PipeTransform } from '@angular/core';
import { NavBarMember } from './model/nav-bar-member';

@Pipe({
  name: 'goalMemberFilter'
})
export class GoalMemberFilter implements PipeTransform {
  mem: NavBarMember;
  transform(items: NavBarMember[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    var itemsArray = items.filter(it => {
      return it.memberName.toLowerCase().includes(searchText);
    });
    if (itemsArray.length == 0) {
      this.mem = {
        hasNewUpdates: false,
        lastUpdate: null,
        memberId: null,
        memberName: null,
        memberImage: null,
        memberEmail: null,
      }
      itemsArray[0] = this.mem;
    }
    return itemsArray;
  }
}

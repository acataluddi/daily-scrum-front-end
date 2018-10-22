import { PipeTransform, Pipe } from "@angular/core";
import { GoalMember } from "./model/goalmember-model";

@Pipe({
    name: 'feedbacklistfilter'
  })
  export class FeedbackFilterPipe implements PipeTransform {
    transform(items: GoalMember[], searchText: string): any[] {
      if (!items) return [];
      if (!searchText) return items;
      searchText = searchText.toLowerCase();
      return items.filter(it => {
        return it.memberName.toLowerCase().includes(searchText);
      });
    }
  }
  
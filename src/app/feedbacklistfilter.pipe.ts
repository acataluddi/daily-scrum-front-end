import { PipeTransform, Pipe } from "@angular/core";
import { GoalUserList } from "./model/goalUserList-model";

@Pipe({
    name: 'feedbacklistfilter'
  })
  export class FeedbackFilterPipe implements PipeTransform {
    transform(items: GoalUserList[], searchText: string): any[] {
      if (!items) return [];
      if (!searchText) return items;
      searchText = searchText.toLowerCase();
      return items.filter(it => {
        return it.memberName.toLowerCase().includes(searchText);
      });
    }
  }
  
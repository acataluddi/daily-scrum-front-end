import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  showHead: boolean = false;
  constructor(private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/' || event['url'] == '/login' || event['url'] == '/**') {
          this.showHead = false;
        } else if (localStorage.getItem("logged") == 'false') {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
      }
    });

    if (router.url == '/**') {
      console.log("Inpropper");
    }
  }
}

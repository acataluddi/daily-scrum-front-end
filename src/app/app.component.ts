import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  showHead:boolean = false;
  constructor(private router: Router) {
      router.events.forEach((event) => {
        if (event instanceof NavigationStart) {
          if (event['url'] == '/login') {
            this.showHead = false;
          } else {
            
            this.showHead = true;
          }
        }
      });
    }

    show(e) {
      console.log(e.target.className);
      if (e.target.className == "arrow2" || e.target.className == "button desktop" || e.target.className == "dp") {
        if (document.getElementById("signout").style.visibility == "hidden") {
          document.getElementById("signout").style.visibility = "visible";
        } else {
          document.getElementById("signout").style.visibility = "hidden";
        }
  
      }
      else if (e.target.className == "arrow" || e.target.className == "dailyscrumclass") {
        if (document.getElementById("projectlist").style.visibility == "hidden") {
          document.getElementById("projectlist").style.visibility = "visible";
        } else {
          document.getElementById("projectlist").style.visibility = "hidden";
        }
  
      } else {
        document.getElementById("signout").style.visibility = "hidden";
        document.getElementById("projectlist").style.visibility = "hidden";
      }
    }
  }
  


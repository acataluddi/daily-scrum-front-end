import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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
  }

  ngOnInit() {
    if (localStorage.getItem("timerCounting") === 'yes') {
      var dr = new Date();
      var startTime = +localStorage.getItem("timerTime")
      var timeElapsed = dr.getTime() - startTime;
      if (timeElapsed >= 2700000) {
        localStorage.clear();
        alert('Your session has been timed out, please login again');
        window.location.reload();
      } else {
        var timeToSet = 2700000 - Math.floor(timeElapsed);
        var timeoutCounter = setTimeout(function () {
          localStorage.clear();
          alert('Your session has been timed out, please login again');
          clearTimeout(timeoutCounter);
          window.location.reload();
        }, timeToSet);
      }
    }
  }
}

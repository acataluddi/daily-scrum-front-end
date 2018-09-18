import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from "./service/login.service";
import {AuthService} from 'angular-6-social-login';
import {AdminviewallComponent} from "./adminviewall/adminviewall.component";


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private loginservice: LoginService,
         private socialAuthService: AuthService,
        private adminviewall:AdminviewallComponent) { }

        flag = false;
        private user;
    loggedin;
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

console.log("loginfrewgwtre:");
console.log(route.url[0].path);

        if (localStorage.getItem("logged") == 'true') {
            if (route.url[0].path === 'admin-view-all'){
                this.socialAuthService.authState.subscribe((user) => {
                    console.log("user:");
                    console.log(user);
                    if (user != null) {
                      this.loginservice.loginMember(user.idToken)
                        .subscribe(msg => {
                          msg.userType;
                          if (msg.userType === "Admin" || msg.userType === "Manager") {
                            return true;
                          }else {
                            this.router.navigate(['/dashboard']);
                              return false;
                          }
              
                        });
                    }
                    });

            }
            if (route.url[0].path === 'task-page-admin'){
                this.socialAuthService.authState.subscribe((user) => {
                    console.log("user:");
                    console.log(user);
                    if (user != null) {
                      this.loginservice.loginMember(user.idToken)
                        .subscribe(msg => {
                          msg.userType;
                          if (msg.userType === "Admin" || msg.userType === "Manager") {
                            return true;
                          }else {
                            this.router.navigate(['/dashboard']);
                              return false;
                          }
              
                        });
                    }
                    });

            }
            if (route.url[0].path === 'project'){
                this.socialAuthService.authState.subscribe((user) => {
                    console.log("user:");
                    console.log(user);
                    if (user != null) {
                      this.loginservice.loginMember(user.idToken)
                        .subscribe(msg => {
                          msg.userType;
                          if (msg.userType === "Admin" || msg.userType === "Manager") {
                            return true;
                          }else {
                            this.router.navigate(['/dashboard']);
                              return false;
                          }
              
                        });
                    }
                    });

            }


            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from "./login.service";


@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router , private loginservice:LoginService) { }
 
    loggedin=false;
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) :boolean {
 
        this.loggedin = this.loginservice.getLoginStatus();
        
        if (this.loggedin){
            return true;
        }else{
            this.router.navigate(['/login']);
            return false;
        }
    }
}
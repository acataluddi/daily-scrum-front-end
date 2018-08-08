import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from "./login.service";



@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router , private loginservice:LoginService) { }
 
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) :boolean {
 
        
        
        if (localStorage.getItem("logged") == 'true'){
            return true;
        }else{
            this.router.navigate(['/login']);
            return false;
        }
    }
}
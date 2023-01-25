import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable, tap } from "rxjs";
import { selectuserActive } from "../state";



@Injectable({
    providedIn:'root'
})
export class RouteProtected implements CanActivate {

    constructor(private readonly store:Store<any>, private route: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        return this.store.pipe(
            select(selectuserActive),
            tap(logged => {
                if(!logged ){
                    this.route.navigateByUrl('/login');
                }
            })
        );
    }
}
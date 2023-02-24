import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConnexionComponent } from '../views/pages/connexion/connexion.component';
import { StorageService } from '../_services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(private router: Router, private storage: StorageService,
    private connexion: ConnexionComponent){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.storage.isLogged()){
      return true;
    } else {
      return this.router.navigate(['/login']);
    }
  }


  
}

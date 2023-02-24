import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Clinique } from 'src/app/models/Clinique';
import { CliniqueService } from 'src/app/services/clinique.service';
import { StorageService } from 'src/app/_services/storage.service';

import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit{

  events: Clinique[] = [];
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showUserBoard = false;
  showPatientBoard = false;
  showCliniqueBoard = false;
  username?: string;
  currentUser: any;
  isLoginFailed = false;
  errorMess = '';

  public navItems = navItems;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };
  listNotif: any;
  totalListNotif: any;

  constructor(
    private route: ActivatedRoute,
    private storage: StorageService,
    private cliniqueService: CliniqueService) {}

  ngOnInit(): void {
    this.currentUser = this.storage.getUser();
    this.isLoggedIn = !!this.storage.getToken();

    if (this.isLoggedIn) {
      const user = this.storage.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showCliniqueBoard = this.roles.includes('ROLE_CLINIC');
      this.showPatientBoard = this.roles.includes('ROLE_PA');

      this.username = user.username;
    }
    this.getAllNotification()
  }

       // La liste des rendez-vous
       getAllNotification() {
        this.cliniqueService.getAllNotification()
        .subscribe(
          res => {
            this.listNotif = res;
            console.log(this.listNotif)
            this.totalListNotif = this.listNotif.length
          },
          err => {
            // location.reload();
        }
        );
      }

}

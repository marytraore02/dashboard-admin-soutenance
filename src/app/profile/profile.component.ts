import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  content?: string;
  listepays: any
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showUserBoard = false;
  username?: string;
  currentUser: any;
  email: any;
  nometPrenom: any;
  contact: any;
  image: any;
  date: any;

  constructor(private storage: StorageService) { }

  ngOnInit(): void {
    this.currentUser = this.storage.getUser();

    this.isLoggedIn = !!this.storage.getToken();

    if (this.isLoggedIn) {
      const user = this.storage.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.showUserBoard = this.roles.includes('ROLE_USER');

      this.username = user.username;
      this.email = user.email;
      this.nometPrenom = user.nomEtPrenom;
      this.contact = user.contact;
      this.image = user.image;
      this.date = user.date;
    }


  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { Clinique } from 'src/app/models/Clinique';
import { CliniqueService } from 'src/app/services/clinique.service';
import { AuthService } from 'src/app/_services/auth.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit{

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  totalClinique: any;

  constructor(
    private classToggler: ClassToggleService,
    private router: Router, 
    private authService: AuthService, 
    private storage: StorageService,
    private cliniqueService: CliniqueService
    ) {
    super();
  }

  showAdminBoard = false;
  showModeratorBoard = false;
  showUserBoard = false;
  listNotif: any;
  totalListNotif: any;
  nom!: any;
	prenom!: any;
	sexe!: any;
	naissance!: any;
  contact!: any;
  date!:any;
  username!:any;
  email!:any;
  password!:any;
  description!:any;
  ville!:any;
  adresse!:any;
  longitude!:any;
  latitude!:any;
  agrement: any;
  img: any;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];


  ngOnInit(): void {
    this.isLoggedIn = !!this.storage.getToken();

    if (this.isLoggedIn) {
      const user = this.storage.getUser();
      this.roles = user.roles;
      this.username = user.username;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.showUserBoard = this.roles.includes('ROLE_USER');
    }
    
    if (this.storage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.storage.getUser().roles;
    }
    this.getAllNotification();
    this.listeClinique();
  }


    detailclinic(id:number){
    this.router.navigate(["/detailclinique", id]);
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

        cliniques: Clinique[] = [];
        clinic = [{
          "nomEtPrenom": this.nom,
          "contact": this.contact,
          "date": this.date,
          "username": this.username,
          "email": this.email,
          "password": this.password,
          "descriptionClinique": this.description,
          "villeClinique": this.ville,
          "adresseClinique": this.adresse,
          "longitudeClinique": this.longitude,
          "latitudeClinique": this.latitude
        }]
        
        listeClinique(): void {
          this.cliniqueService.liste().subscribe(
            data => {
              console.log(data);
              this.cliniques = data;
              this.totalClinique = this.cliniques.length
              // this.id = this.cliniques[1].id
            },
            err => {
              console.log(err);
            }
          );
        }

  logout(): void {
    this.storage.signOut();
    window.location.reload();
  }

  // navigate(){
  //   this.router.navigateByUrl('/dashboard')
  // }

  reloadPage(): void {
    window.location.reload();
  }


}

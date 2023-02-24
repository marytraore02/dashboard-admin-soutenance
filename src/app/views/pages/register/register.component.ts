import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Clinique } from 'src/app/models/Clinique';
import { CliniqueService } from 'src/app/services/clinique.service';
import { AuthService } from 'src/app/_services/auth.service';
import { StorageService } from 'src/app/_services/storage.service';
import Swal from 'sweetalert2';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpecialiteService } from 'src/app/services/specialite.service';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class RegisterComponent implements OnInit {

  showAdminBoard = false;
  showModeratorBoard = false;
  showUserBoard = false;
  specialites: any;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  nom!: any;
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
  idSpec:any;
  errorMess = '';
  geoAddress: any;
  userLatitude: any;
  userLongitude: any;



  form: any = {
    username: null,
    password: null,
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private storage: StorageService,
    private cliniqueSevice: CliniqueService,
    private modalService: NgbModal,
    private specialiteService: SpecialiteService,
    private nativegeocoder: NativeGeocoder
  ) {}

  openLg(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }
  open(content: any) {
    this.modalService.open(content);
  }

  options: NativeGeocoderOptions = {
    useLocale : true,
    maxResults: 5
  }

    // Location debut
    async fetchLocation() {
      const location = await Geolocation.getCurrentPosition();
      console.log('location = ', location);
      this.nativegeocoder.reverseGeocode(location.coords.latitude,
        location.coords.longitude,
        this.options)
        .then((result: NativeGeocoderResult[]) => {
          console.log('result = ', result);
          console.log('result 0 = ', result[0]);
  
          this.geoAddress = this.generateAddress(result[0]);
          console.log('location address = ', this.geoAddress);
        });

      this.userLatitude = location.coords.latitude
      this.userLongitude = location.coords.longitude
    }
    generateAddress(addressObj: any) {
      let obj: any[] = [];
      let uniqueNames: any[] = [];
      let address = "";
      for (let key in addressObj) {
        if (key !== 'areasOfInterest') {
          obj.push(addressObj[key]);
        }
      }
  
      let i = 0;
      obj.forEach(value => {
        if (uniqueNames.indexOf(obj[i]) === -1) {
          uniqueNames.push(obj[i]);
        }
        i++;
      });
  
      uniqueNames.reverse();
      for (const val of uniqueNames) {
        if (uniqueNames[val].length > 0) {
          address += uniqueNames[val] + ', ';
        }
      }
      return address.slice(0, -2);
    }

  ngOnInit(): void {
    this.fetchLocation();
    this.isLoggedIn = !!this.storage.getToken();

    if (this.isLoggedIn) {
      const user = this.storage.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.showUserBoard = this.roles.includes('ROLE_USER');

      this.username = user.username;
    }

    if (this.storage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.storage.getUser().roles;
    }
    this.listeSpecialiite();
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: (data) => {
        this.storage.saveToken(data.accessToken);
        this.storage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storage.getUser().roles;
        //this.reloadPage();
        this.navigate();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
    });
  }


      //Recuperationn de l'image depuis la formulaire
      recuperationImage(event: any) {
        this.agrement = event.target["files"][0];
        console.log(this.agrement)
      }
  
          //Recuperationn de l'image depuis la formulaire
          recuperationImg(event: any) {
            this.img = event.target["files"][0];
            console.log(this.img)
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

   //La creation de la methode de creation
   onCreate(): void {
    console.log(this.clinic)
    this.cliniqueSevice.Creer(this.agrement,this.img,this.nom,this.contact,this.date,this.username,this.email,this.password,
      this.description,this.ville,this.adresse,this.userLongitude,this.userLatitude,this.idSpec).subscribe(
     { next:
      data => {
        console.log(data);
        this.popUp();
      },
      error: err => {
        console.log(err);
        this.errorMess = err.error.message;
        this.isLoginFailed = true;
      }
    }
    );
  }

  listeSpecialiite(): void {
		this.specialiteService.liste().subscribe(
		  data => {
			console.log(data);
			this.specialites = data;
		  },
		  err => {
			console.log(err);
		  }
		);
	  }


  popUp() {
		Swal.fire({
		  position:'center',
		  title: 'Géo-clinique',
		  text: 'Compte clinique créer avec success!!',
		  icon:'success',
		  heightAuto: false,
		  showConfirmButton: true,
		  confirmButtonText: "OK",
		  confirmButtonColor: '#0857b5',
		  showDenyButton: false,
		  showCancelButton: false,
		  allowOutsideClick: false
		}).then((result) => {
		  if (result.isConfirmed) {
        //window.location.reload();
			this.router.navigateByUrl('/register-success', {skipLocationChange: true}).then(() => {
			  this.router.navigate(["/register-success"])
			})
		  }
		})
	
	  }


  navigate() {
    this.router.navigateByUrl('/dashboard');
  }


}

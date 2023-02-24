import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';

import { Geolocation } from '@capacitor/geolocation';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Clinique } from '../../../models/Clinique';
import { CliniqueService } from '../../../services/clinique.service';
import { ToastrService } from 'ngx-toastr';
import { SpecialiteService } from 'src/app/services/specialite.service';
import { StorageService } from 'src/app/_services/storage.service';
import { MedecinService } from 'src/app/services/medecin.service';
import { RendezvousService } from 'src/app/services/rendezvous.service';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-clinique',
  templateUrl: './clinique.component.html',
  styleUrls: ['./clinique.component.scss'],
  providers: [NgbModalConfig, NgbModal],
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .dark-modal .modal-content {
        background-color: #292b2c;
        color: white;
      }
      .dark-modal .close {
        color: white;
      }
      .light-blue-backdrop {
        background-color: #5cb3fd;
      }
    `,
  ],
})
export class CliniqueComponent implements AfterContentInit{
  searchText:any;
  cli:any;
  p:any;
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
  idSpec:any;
  specialites: any;
  detail: any;
  id: any;
  totalClinique: any;
  isLoginFailed = false;
  errorMess = '';
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showUserBoard = false;
  showPatientBoard = false;
  showCliniqueBoard = false;
  currentUser: any;
  idClinique: any;  
  clinique: any;
  listmedecins: any; 
  specialiteClinique: any;
  countListMedecin: any;
  status: any;
  alertImage= false;
  image: any;
  idMedecin: any;
  listRdvMedcin: any;
  geoAddress: any;
  userLatitude: any;
  userLongitude: any;


  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private storage: StorageService,
    private cliniqueSevice: CliniqueService,
    private specialiteService: SpecialiteService,
    private medecinService: MedecinService,
    private RdvService: RendezvousService,
    private nativegeocoder: NativeGeocoder
  ) {}

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

  ngAfterContentInit(): void {
    // const id = this.route.snapshot.params['id'];
    // console.log("param id => "+ id)
    this.fetchLocation();

    this.currentUser = this.storage.getUser();
    this.isLoggedIn = !!this.storage.getToken();
    const id = this.currentUser.id;
    console.log("current => "+id)

    if (this.isLoggedIn) {
      const user = this.storage.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showCliniqueBoard = this.roles.includes('ROLE_CLINIC');
      this.showPatientBoard = this.roles.includes('ROLE_PA');

      this.username = user.username;
    }


    this.changeDetectorRef.detectChanges();
    this.listeClinique();
    this.listeSpecialiite();

    //this.listeSpecialiite();

    this.cliniqueSevice.detail(id).subscribe(
      (data) => {
        this.clinique = data;
        console.log(this.clinique)
        this.specialiteClinique = this.clinique.listeSpecialiteCli[0].libelleSpecialite;
        console.log(this.specialiteClinique)
        this.status = this.clinique.statusClinique
        console.log(this.status)

      },
      (err) => {
      }
    );

    this.medecinService.getByMedecinClinique(id).subscribe(
      data => {
        console.log(data);
        this.listmedecins = data;
        this.nom = this.listmedecins.nomMedecin
        this.countListMedecin = this.listmedecins.length
        this.idMedecin = this.listmedecins.idMedecin
        console.log(this.nom)
        console.log(this.idMedecin)
        console.log(this.listmedecins)
      },
      err => {
        console.log(err);
      }
    );

    this.RdvService.getRdvMedecin(this.idMedecin).subscribe(
      data => {
        console.log(data);
        this.listRdvMedcin = data;
        console.log(this.listRdvMedcin)
      },
      err => {
        console.log(err);
      }
    );

  }

  // detailclinic(id:number){
  //   this.router.navigate(["/detailclinique", id]);
  // }

  openLg(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }
  open(content: any) {
    this.modalService.open(content);
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
      this.description,this.ville,this.adresse,this.userLongitude,this.userLatitude,this.idSpec)
      .subscribe(
     { next:
      data => {
        this.popUpClinique();
        console.log(data);
        
      },
      error: err => {
        console.log(err);
        this.errorMess = err.error.message;
        this.isLoginFailed = true;
      }
    }
    );
  }

     //La methode de mse a jour d'une clinique
    //  Update(): void {
    //   this.cliniqueSevice.Upadate(this.agrement,this.img,this.nom,this.contact,this.date,this.username,this.email,this.password,
    //     this.description,this.ville,this.adresse,this.longitude,this.latitude,this.id).subscribe(
    //    { next:
    //     data => {
    //       this.popUp();
    //       console.log(data);
    //     },
    //     error: err => {
    //     }
    //   }
    //   );
    // }


    //METHODE PERMETTANT DE SE DECONNECTER
    // deletePopUp(id:any): void {
    //   //console.log(id)
    //     const swalWithBootstrapButtons = Swal.mixin({
    //       customClass: {
    //       confirmButton: 'btn btn-primary',
    //       cancelButton: 'btn btn-danger',
    //       },
    //       heightAuto: false
    //     })
    //     swalWithBootstrapButtons.fire({
    //       title: 'Attention',
    //       text: "Etes-vous sûre de vouloir supprimer la clinique ?",
    //       icon: 'warning',
    //       showCancelButton: true,
    //       confirmButtonText: 'Confimer',
    //       cancelButtonText: 'Annuler',
    //       // reverseButtons: true
    //     }).then((result) => {
    //     if (result.isConfirmed) {
    //       this.cliniqueSevice.delete(id).subscribe(
    //         { next:
    //           data => {
    //           // this.deletePopUp(id);
    //             console.log(data);
    //           },
    //           error: err => {
    //           }
    //         }
    //         );
    //      // console.log(id)
    //       window.location.reload();
    //       // this.router.navigateByUrl('/clinique/clinique', {skipLocationChange: true}).then(() => {
    //       //     this.router.navigate(["/clinique/clinique"])
    //       //   })
    //       // this.storage.signOut();
          
    //      }
    //     })

    // }


        //METHODE PERMETTANT DE SE DECONNECTER
        deletePopUp(id:any) {
          Swal.fire({
            position:'center',
            title: 'Attention',
            text: 'Vous êtes sur le point de supprimer cette clinique!',
            icon:'warning',
            heightAuto: false,
            showConfirmButton: true,
            confirmButtonText: "D'accord",
            confirmButtonColor: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Annuler',
            showDenyButton: false,
            allowOutsideClick: false
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                position:'center',
                title: 'Cette action est irréversible',
                text: 'La clinique sera definitivement supprimer, avec toute ces medecins et RDV par consequent!',
                icon:'warning',
                heightAuto: false,
                showConfirmButton: true,
                confirmButtonText: "Supprimer",
                confirmButtonColor: 'red',
                showCancelButton: true,
                cancelButtonText: 'Annuler',
                allowOutsideClick: false
              }).then((result) => {
                if (result.isConfirmed) {
                  this.cliniqueSevice.delete(id).subscribe(
                    { next:
                      data => {
                      // this.deletePopUp(id);
                        console.log(data);
                      },
                      error: err => {
                      }
                    }
                    );
                  // this.router.navigate(['/detailmedecin',this.listmedecins.idMedecin])
                  window.location.reload();
                }
              })
            }
          })
      
        }

        Delete(id:any){
          this.medecinService.DeleteMedecin(id).subscribe({
            next: data => { 
              console.log(data)
            },
            error: err => {
      
            }
              // this.actualisePage(this.idUser,this.Utilisateur)
            // this.presentAlert()
           })
        }

           //METHODE PERMETTANT DE SE DECONNECTER
           deletePopUpMedecin(id:any) {
            Swal.fire({
              position:'center',
              title: 'Attention',
              text: 'Vous êtes sur le point de supprimer ce medecin!',
              icon:'warning',
              heightAuto: false,
              showConfirmButton: true,
              confirmButtonText: "D'accord",
              confirmButtonColor: 'warning',
              showCancelButton: true,
              cancelButtonText: 'Annuler',
              showDenyButton: false,
              allowOutsideClick: false
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  position:'center',
                  title: 'Cette action est irréversible',
                  text: 'Tout les rendez-vous du medecin seront supprimer en consequent!',
                  icon:'warning',
                  heightAuto: false,
                  showConfirmButton: true,
                  confirmButtonText: "Supprimer",
                  confirmButtonColor: 'red',
                  showCancelButton: true,
                  cancelButtonText: 'Annuler',
                  allowOutsideClick: false
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.Delete(id);
                    // this.router.navigate(['/detailmedecin',this.listmedecins.idMedecin])
                    window.location.reload();
                    // this.router.navigateByUrl('/clinique', {skipLocationChange: true}).then(() => {
                    //   this.router.navigate(["/clinique"])
                    // })
                  }
                })
              }
            })
        
          }


  //Recuperationn de l'image depuis la formulaire
  recuperationImgMedecin(event: any) {
    this.image = event.target["files"][0];
    console.log(this.image)
    }

        		//La creation de al specialite
      onCreateMedecin(): void {
        this.medecinService.Creer(this.image,this.nom,this.prenom,this.email,this.sexe,this.naissance,this.contact,this.idSpec)
        .subscribe(
         { next:
          data => {
          console.log(data);
          if(this.image == null){
            this.alertImage=true
            this.errorMess="  Veuillez ajoutez une image !"
          } else {
            this.popUp();
          }
          //this.retour();
          },
          
          error: err => {
            console.log(err);
          this.errorMess = err.error.message;
          this.isLoginFailed = true;
          }
        }
        );
        }

             	//La creation de al specialite
      Update(): void {
        this.medecinService.Update(this.image,this.nom,this.prenom,this.email,this.sexe,this.naissance,this.contact).subscribe(
         { next:
          data => {
          console.log(data);
           //this.popUp();
          //this.retour();
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

  listeClinique(): void {
    this.cliniqueSevice.liste().subscribe(
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


  popUp() {
		Swal.fire({
		  position:'center',
		  title: 'Géo-clinique',
		  text: 'Médécin créer avec success!!',
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
        window.location.reload();
		  }
		})
	  }

    popUpClinique() {
      Swal.fire({
        position:'center',
        title: 'Géo-clinique',
        text: 'Clinique créer avec success!!',
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
          window.location.reload();
        }
      })
      }

  
   //Pop up de enregistrement reçu
   MessageSuccess() {
    Swal.fire({
      title: 'Clinic creer avec succes',
      showConfirmButton: true,
      confirmButtonText: 'OK',
      confirmButtonColor: '#FF7900',
      heightAuto: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.router
          .navigateByUrl('/clinique/clinique', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/clinique/clinique']);
          });
      } else if (result.isDenied) {
        this.router.navigateByUrl('/clinique/clinique');
      }
    });
  }

  back(): void {
    window.history.back()
  }

}

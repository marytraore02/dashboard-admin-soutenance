import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clinique } from 'src/app/models/Clinique';
import { CliniqueService } from 'src/app/services/clinique.service';
import { StorageService } from 'src/app/_services/storage.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MedecinService } from 'src/app/services/medecin.service';
import { Medecin } from 'src/app/models/medecin';
import { SpecialiteService } from 'src/app/services/specialite.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-detailclinique',
  templateUrl: './detailclinique.component.html',
  styleUrls: ['./detailclinique.component.scss'],
})
export class DetailcliniqueComponent implements OnInit {
  
  clinique: any;
  listmedecins: any; 
  searchText:any;
  p:any;
  specialiteMedecin: any;
  specialiteClinique: any;
  countListMedecin: any;
  status: any;
  nom!: any;
	prenom!: any;
	email!: any;
	sexe!: any;
	naissance!: any;
	contact!: any;
	specialites!:any;
  idSpec:any;
  popupResult!: boolean;
  statusOk = false;

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

	image: any;

  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});
  listSpecialit: any;
  statusChar: any;
  alertImage= false;

  constructor(
    private cliniqueService: CliniqueService,
    private route: ActivatedRoute,
    private storage: StorageService,
    private modalService: NgbModal,
    private medecinService: MedecinService,
    private specialiteService: SpecialiteService,
    private router: Router
  ) {}



  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    console.log("param id => "+ id)

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

    //this.currentUser = this.storage.getUser()

		this.listeSpecialiite();

    this.cliniqueService.detail(id).subscribe(
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
        // this.listSpecialit = this.listmedecins.listeSpecialiteMed;
        // console.log(this.listSpecialit)
        console.log(this.listmedecins)
      },
      err => {
        console.log(err);
      }
    );
  }


	        //Recuperationn de l'image depuis la formulaire
          recuperationImg(event: any) {
            this.image = event.target["files"][0];
            console.log(this.image)
            }
  
  
			//La creation de al specialite
      onCreate(): void {
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

        listeSpecialiite(): void {
          this.specialiteService.liste().subscribe(
            data => {
            console.log("Liste specialite=> "+data);
            this.specialites = data;
            },
            err => {
            console.log(err);
            }
          );
          }

        //METHODE PERMETTANT DE SE DECONNECTER
        deletePopUp(id:any) {
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

        popUp() {
          Swal.fire({
            position:'center',
            // title: 'Géo-clinique',
            text: 'Medecin creer avec success!!',
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
            //this.router.navigate(['/detailclinique',this.listmedecins.idMedecin])
            window.location.reload();
            // this.router.navigateByUrl('/clinique', {skipLocationChange: true}).then(() => {
            //   this.router.navigate(["/clinique"])
            // })
            }
          })
        
          }

            
   //Pop up de enregistrement reçu
   MessageSuccess() {
    Swal.fire({
      title: 'Clinique activer avec success',
      showConfirmButton: true,
      confirmButtonText: 'OK',
      confirmButtonColor: '#FF7900',  
      heightAuto: false,
    }).then((result) => {
      if (result.isConfirmed) {
         this.router.navigate(['/detailclinique',this.clinique.id]);
         window.location.reload();
        }
      });
  }
     //Pop up de enregistrement reçu
     MessageSuccessNo() {
      Swal.fire({
        title: 'Clinique désactiver avec success',
        showConfirmButton: true,
        confirmButtonText: 'OK',
        confirmButtonColor: '#FF7900',  
        heightAuto: false,
      }).then((result) => {
        if (result.isConfirmed) {
           this.router.navigate(['/detailclinique',this.clinique.id]);
           window.location.reload();
          }
        });
    }


            detailmedecin(id:number){
              this.router.navigate(["/detailclinique", id]);
            }
           


            updateStatus(event: any) {
              this.cliniqueService.changeStatusClinique(event).subscribe(
                res => {
                    this.MessageSuccess();
                    this.statusOk = true;
                },
                err => {
                      alert('Une erreur s\'est produite lors de la mise à jour de l\'événement.');
              }
              );
            }


            updateStatusNo(event: any) {
              this.cliniqueService.changeStatusClinique(event).subscribe(
                res => {
                    this.MessageSuccessNo();
                    this.statusOk = true;
                },
                err => {
                      alert('Une erreur s\'est produite lors de la mise à jour de l\'événement.');
              }
              );
            }



  openLg(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }
  open(content: any) {
    this.modalService.open(content);
  }


  back(): void {
    window.history.back()
  }
  onItemChange($event: any): void {
    console.log('Carousel onItemChange', $event);
  }

}

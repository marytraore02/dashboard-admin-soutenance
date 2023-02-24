import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Patient } from 'src/app/models/patient';
import { PatientService } from '../../../app/services/patient.service';
import { StorageService } from 'src/app/_services/storage.service';


@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
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
export class PatientsComponent  implements AfterContentInit{

  searchText:any;
  p:any;
  nom!: string;
  contact!: string;
  date!:string;
  username!:string;
  email!:string;
  password!:string;
  sexe!: string;
  naissance!: string;
  image: any;
  NbrePatient: any;
  id:any;
  private roles: string[] = [];
	isLoggedIn = false;
	showAdminBoard = false;
	showModeratorBoard = false;
	showUserBoard = false;
	showPatientBoard = false;
	showCliniqueBoard = false;
	currentUser: any;
	isLoginFailed = false;


  constructor(
    private router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private changeDetectorRef: ChangeDetectorRef,
    private patientService: PatientService,
    private storage: StorageService
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();
    
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
    this.listePatients();
  }
  openLg(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }
  open(content: any) {
    this.modalService.open(content);
  }

  patients: Patient[] = [];
	patient = [{
    "nomEtPrenom": this.nom,
    "contact": this.contact,
    "date": this.date,
    "username": this.username,
    "email": this.email,
    "password": this.password,
    "sexePatient": this.sexe,
  }]
  
    //Recuperationn de l'image depuis la formulaire
    recuperationImg(event: any) {
      this.image = event.target["files"][0];
      console.log(this.image)
      }

			//La creation de al specialite
      onCreate(): void {
        console.log("patient => "+this.patient)
        this.patientService.Creer(this.image,this.nom,this.contact,this.date,this.username,this.email,this.password,this.sexe).subscribe(
         { next:
          data => {
          console.log(data);
          this.popUp();
          //this.retour();
          },
          
          error: err => {
          // this.errorMess = err.error.message;
          // this.isSignUpFailed = true;
          }
        }
        );
        }
    
      listePatients(): void {
        this.patientService.liste().subscribe(
          data => {
          console.log(data);
          this.patients = data;
          this.NbrePatient = data.length
          },
          err => {
          console.log(err);
          }
        );
        }

        DeletePatient(id:any){
          this.patientService.DeletePatient(id).subscribe({
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
deletePopUp(id:any): void {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-danger',
    },
    heightAuto: false
  })
  swalWithBootstrapButtons.fire({
    // title: 'Etes-vous sûre de vous déconnecter?',
    text: "Etes-vous sûre de vouloir supprimer le patient ?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Confimer',
    cancelButtonText: 'Annuler',
    // reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      this.DeletePatient(id);
       this.router.navigateByUrl('/patients', {skipLocationChange: true}).then(() => {
            this.router.navigate(["/patients"])
          })
        // this.storage.signOut();
        // window.location.reload();
    }
  })

}
      
    
        popUp() {
        Swal.fire({
          position:'center',
          // title: 'Géo-clinique',
          text: 'Patient creer avec success!!',
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
          // this.router.navigateByUrl('/login', {skipLocationChange: true}).then(() => {
          //   this.router.navigate(["/login"])
          // })
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
          .navigateByUrl('/clinics', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/clinics']);
          });
      } else if (result.isDenied) {
        this.router.navigateByUrl('/clinics');
      }
    });
  }
  

}

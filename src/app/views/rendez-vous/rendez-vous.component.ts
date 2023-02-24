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
import { RendezvousService } from '../../services/rendezvous.service';
import { StorageService } from 'src/app/_services/storage.service';


interface IUser {
	id: number;
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.scss'],
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
export class RendezVousComponent implements AfterContentInit{
  searchText:any;
  p:any;
  listrdv: any;
  totalRdv: any;
  status: any;
  rdvValide: any;
  totalRdvValide: any;
  rdvNonValide:any;
  totalRdvNonValide: any;
  textFiltre: any="total";
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
  id: any;



  constructor(
    private router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private changeDetectorRef: ChangeDetectorRef,
    private rdvService: RendezvousService,
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
      this.id = user.id;
      console.log(this.id)
	
		  this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
		  this.showCliniqueBoard = this.roles.includes('ROLE_CLINIC');
		  this.showPatientBoard = this.roles.includes('ROLE_PA');
	
		  this.username = user.username;
		}

    this.getRendezvous();
    this.getRendezvousValide();
    this.getRendezvousNonValide();
  }
  openLg(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }
  open(content: any) {
    this.modalService.open(content);
  }

      // La liste des rendez-vous
      getRendezvous() {
        this.rdvService.getAllRendezvous()
        .subscribe(
          res => {
            this.listrdv = res;
            console.log(this.listrdv)
            this.totalRdv = this.listrdv.length
            console.log(this.listrdv)
            // this.status = this.listrdv.active.length
            // console.log(this.status)
          },
          err => {
            // location.reload();
        }
        );
      }

            // La liste des rendez-vous
            getRendezvousValide() {
              this.rdvService.getAllRendezvousValide()
              .subscribe(
                res => {
                  this.listrdv = res;
                  console.log(this.listrdv)
                  this.totalRdvValide = this.listrdv.length
                  console.log(this.totalRdvValide)
                  // this.status = this.listrdv.active.length
                  // console.log(this.status)
                },
                err => {
                  // location.reload();
              }
              );
            }
                   // La liste des rendez-vous
                   getRendezvousNonValide() {
                    this.rdvService.getAllRendezvousNonValide()
                    .subscribe(
                      res => {
                        this.listrdv = res;
                        console.log(this.listrdv)
                        this.totalRdvNonValide = this.listrdv.length
                        console.log(this.totalRdvNonValide)
                        // this.status = this.listrdv.active.length
                        // console.log(this.status)
                      },
                      err => {
                        // location.reload();
                    }
                    );
                  }

   

                  filtreparsatatus(){
                    console.log(this.textFiltre);
                    if(this.textFiltre=="total"){
                      this.getRendezvous();
                    } else if(this.textFiltre=="confirmer"){
                      this.getRendezvousValide();
                    } else if(this.textFiltre=="non confirmer"){
                      this.getRendezvousNonValide();
                    }
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

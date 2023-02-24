import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CliniqueService } from 'src/app/services/clinique.service';
import { MedecinService } from 'src/app/services/medecin.service';
import { SpecialiteService } from 'src/app/services/specialite.service';
import { StorageService } from 'src/app/_services/storage.service';
import { Calendar } from "./models/calendar";
import { Event } from "./models/event";
import { HttpErrorResponse } from '@angular/common/http';
import { OffcanvasModule } from '@coreui/angular';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-detailmedecin',
  templateUrl: './detailmedecin.component.html',
  styleUrls: ['./detailmedecin.component.scss']
})
export class DetailmedecinComponent implements OnInit{
  detailmedecin: any;

  popupResult!: boolean;
  popupMessage = '';

  calendarRequest: any;

  calendar: Calendar = {date: '', size: 0, events: []};
  events: Event[] = [];
  prenom: any;
  idMedecin: any;
  specialiteMedecin: any;
  idMed: any;
  mess: any;
  errorMess: any;
  statusCodeValue: number=0;
 // id: any;


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

    this.medecinService.detail(id).subscribe(
      (data) => {
        this.detailmedecin = data;
        this.idMedecin = this.detailmedecin.idMedecin
        console.log(this.idMedecin)
        this.specialiteMedecin = this.detailmedecin.listeSpecialiteMed[0].libelleSpecialite;
      },
      (err) => {
      }
    );

      // Detail medecin methodes
      this.calendarRequest = new Date().toISOString().slice(0, 10);
      console.log(this.calendarRequest)
    

  this.getAppointment(id);


  }


  getAppointment(id:any) {
    this.cliniqueService.calendarEvent(this.calendarRequest,id)
    .subscribe(
      res => {
        this.calendar = res;
        this.events = res.events;
        console.log(res);
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 500) {

            //this.storage.signOut();
          } else if (err.status === 404) {
            //location.reload();
          }
        }
    }
    );
  }

  getAppointmentPrev(calendarRequest: any, id:any) {
    this.cliniqueService.calendarEvent(calendarRequest,id)
    .subscribe(
      res => {
        this.calendar = res;
        this.events = res.events;
        console.log(res);
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400 || err.status === 500) {

            //this.storage.signOut();
          } else if (err.status === 404) {
            //location.reload();
          }
        }
    }
    );
  }

  getAppointmentNext(calendarRequest: any, id:any) {
    this.cliniqueService.calendarEvent(calendarRequest,id)
    .subscribe(
     { next:
      res => {
        this.calendar = res;
        this.events = res.events;
        console.log(res);
      },
        error: err => {
        console.log(err);
        this.errorMess = err.body.message;
        this.dateExistFailed = true;
      }
    }
    );
    }
  // getAppointmentNext(calendarRequest: any, id:any) {
  //   this.cliniqueService.calendarEvent(calendarRequest,id)
  //   .subscribe(
  //     res => {
  //       this.calendar = res;
  //       this.events = res.events;
  //       console.log(res);
  //     },
  //     err => {
  //       console.log(err);
  //       this.errorMess = err.error.message;
  //       this.dateExistFailed=true;
  //     }
  //   );
  // }
  

  dateExistFailed = false;

  previousDate(calendarRequest: string, id:any) {
    let dt = new Date(calendarRequest);
    dt.setDate( dt.getDate() - 1 );
    this.calendarRequest = dt.toISOString().slice(0, 10);
    this.calendar.date = this.calendarRequest;
    console.log(this.calendarRequest)
    this.getAppointmentPrev(this.calendarRequest,id);
  }
  nextDay(calendarRequest: string, id:any) {
    let dt = new Date(calendarRequest);
    dt.setDate( dt.getDate() + 1 );
    this.calendarRequest = dt.toISOString().slice(0, 10);
    this.calendar.date = this.calendarRequest;
    this.getAppointmentNext(this.calendarRequest,id);
    
    // if(this.getAppointmentNext(this.calendarRequest,id)!=null){
    //   this.getAppointmentNext(this.calendarRequest,id);
    //   this.dateExistFailed=false;
    // }else{
    //     this.mess = "Aucun rendez-vous a cette date";
    //     this.dateExistFailed=true;
    // }
    
  }


        //METHODE PERMETTANT DE SE DECONNECTER
        deletePopUp(event: Event) {
          Swal.fire({
            position:'center',
            title: 'Attention',
            text: 'Vous êtes sur le point de supprimer ce rendez-vous!',
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
                text: 'Le rendez-vous sera definitivement supprimer !',
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
                  this.deleteEvent(event);
                  // this.router.navigate(['/detailmedecin',this.listmedecins.idMedecin])
                  window.location.reload();
                }
              })
            }
          })
      
        }



  deleteEvent(event: Event) {
    if(confirm('(Le patient sera notifier par email)')) {
      this.cliniqueService.deleteEvent(event.rdvId).subscribe(
        res => {
          let indexOfEvent = this.events.indexOf(event);
          this.events.splice(indexOfEvent, 1 );
          this.calendar.size--;
        },
        err => {
          alert('Could not delete Event');
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401 || err.status === 500) {
                //this.router.navigate(['/login']);
            }
          }
        }
      );
    }
  }

  updateEventStatus(event: Event) {
    const status = (event.status) ? 'Activer' : 'Annuler';
    if (confirm('Vous allez ' + status + ' le rendez-vous | Mr.' + event.prenomPatient  + ' sera notifer par email. ')) {
      this.cliniqueService.changeEventStatus(event.rdvId).subscribe(
        res => {

        },
        err => {
              alert('Une erreur s\'est produite lors de la mise à jour de l\'événement.');
              // if (err instanceof HttpErrorResponse) {
              //   if (err.status === 401 || err.status === 500) {
              //       this.router.navigate(['/login']);
              //   }
              // }
      }
      );
    }
  }

  back(): void {
    window.history.back()
  }


}

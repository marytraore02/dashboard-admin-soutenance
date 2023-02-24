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
import { Clinique } from '../../../models/Clinique';
import { CliniqueService } from '../../../services/clinique.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clinics',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.scss'],
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
export class ClinicsComponent implements AfterContentInit {
  searchText: any;
  p: any;
  nom!: any;
  contact!: any;
  date!: any;
  username!: any;
  email!: any;
  password!: any;
  description!: any;
  ville!: any;
  adresse!: any;
  longitude!: any;
  latitude!: any;
  image: any;

  constructor(
    private router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private changeDetectorRef: ChangeDetectorRef,
    private cliniqueSevice: CliniqueService
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();
  }
  openLg(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }
  open(content: any) {
    this.modalService.open(content);
  }

  //Recuperationn de l'image depuis la formulaire
  recuperationImage(event: any) {
    this.image = event.target['files'][0];
    console.log(this.image);
  }

  cliniques: Clinique[] = [];
  clinic = [
    {
      nomEtPrenom: this.nom,
      contact: this.contact,
      date: this.date,
      username: this.username,
      email: this.email,
      password: this.password,
      descriptionClinique: this.description,
      villeClinique: this.ville,
      adresseClinique: this.adresse,
      longitudeClinique: this.longitude,
      latitudeClinique: this.latitude,
    },
  ];

  //retour sur la page precedente
  retour(): void {
    //this.router.navigate(['/new']);
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

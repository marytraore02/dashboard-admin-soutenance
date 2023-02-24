import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MedecinService } from '../../../app/services/medecin.service';
import { Medecin } from 'src/app/models/medecin';
import { SpecialiteService } from 'src/app/services/specialite.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-medecins',
  templateUrl: './medecins.component.html',
  styleUrls: ['./medecins.component.scss'],
  providers: [NgbModalConfig, NgbModal],
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
export class MedecinsComponent implements OnInit{
	searchText:any;
	p:any;
	nom!: any;
	prenom!: any;
	email!: any;
	sexe!: any;
	naissance!: any;
	contact!: any;
	specialites!:any;
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
	
	idSpec:any;

	image: any;
	NbreMedecin: any;

  constructor(private router: Router,config: NgbModalConfig, private modalService: NgbModal,
	private medecinservice: MedecinService,
	private specialiteService: SpecialiteService,
	private storage: StorageService) {
		// customize default values of modals used by this component tree
		config.backdrop = 'static';
		config.keyboard = false;
	}

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
		this.listeMedecin();
		this.listeSpecialiite();
	}

	openLg(content: any) {
		this.modalService.open(content, { size: 'lg' });
	}
	open(content: any) {
		this.modalService.open(content);
	}

	medecins: Medecin[] = [];
	medecin = [{
		"nomMedecin": this.nom,
		"prenomMedecin": this.prenom,
		"emailMedecin": this.email,
		"sexeMedecin": this.sexe,
		"naissanceMedecin": this.naissance,
		"contactMedecin": this.contact,
		// "listeSpecialiteMed": this.idSpec
	}]

	        //Recuperationn de l'image depuis la formulaire
			recuperationImg(event: any) {
				this.image = event.target["files"][0];
				console.log(this.image)
			  }
	
				//La creation de al specialite
	   onCreate(): void {
		console.log("medecin => "+this.medecin)
		this.medecinservice.Creer(this.image,this.nom,this.prenom,this.email,this.sexe,this.naissance,this.contact,this.idSpec).subscribe(
		 { next:
		  data => {
			console.log("data medecin creer => "+data);
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

	listeMedecin(): void {
		this.medecinservice.liste().subscribe(
		  data => {
			console.log("Liste medecin =>"+data);
			this.medecins = data;
			console.log(this.medecins)
			this.NbreMedecin = this.medecin.length
		  },
		  err => {
			console.log(err);
		  }
		);
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
			this.router.navigateByUrl('/medecins', {skipLocationChange: true}).then(() => {
			  this.router.navigate(["/medecins"])
			})
		  }
		})
	
	  }




}

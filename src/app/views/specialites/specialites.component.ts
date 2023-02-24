import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecialiteService } from '../../../app/services/specialite.service';
import { Specialite } from 'src/app/models/specialite';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-specialites',
  templateUrl: './specialites.component.html',
  styleUrls: ['./specialites.component.scss'],
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
export class SpecialitesComponent implements OnInit{

	searchText:any;
	p:any;
	libelle!: string;
	image: any;
	description!: string;
	NbreSpecialite: any;
	
	isSuccessful = false;
	isSignUpFailed = false;
	updateFailed = false;
	errorMess = '';
  
	form!: FormGroup; 
	detailSpect: any;
	idSpec: any;
	libelleMod: any;
	descriptionMod: any;
	idSpecialite: any;
	
  constructor(private router: Router,config: NgbModalConfig, private modalService: NgbModal,
	private specialiteService: SpecialiteService,
	private route: ActivatedRoute) {
		// customize default values of modals used by this component tree
		config.backdrop = 'static';
		config.keyboard = false;
	}
	

	ngOnInit(): void{
		this.listeSpecialiite();
		//this.getDetail();
		
	}

	openLg(content: any) {
		this.modalService.open(content, { size: 'lg' });
	}
	open(content: any) {
		this.modalService.open(content);
	}

	specialites: Specialite[] = [];
	specialit = [{
		"libelleSpecialite": this.libelle,
		"descriptionSpecialite": this.description
	}]

	update = false;
	getDetail(update: boolean){
		// console.log(id)
		// this.idSpec = id
		this.specialiteService.detail(this.idSpecialite).subscribe(
			(data) => {
			  this.detailSpect = data;
			  this.idSpecialite = this.detailSpect.idSpecialite
			  this.libelleMod = this.detailSpect.libelleSpecialite
			  this.descriptionMod = this.detailSpect.descriptionSpecialite
			  console.log(this.detailSpect.idSpecialite) 
			  console.log(this.detailSpect.libelleSpecialite)
			  console.log(this.detailSpect.descriptionSpecialite)
			},
			(err) => {
			}
		  );
	}

        //Recuperationn de l'image depuis la formulaire
        recuperationImg(event: any) {
			this.image = event.target["files"][0];
			console.log(this.image)
		  }

		    //La creation de al specialite
   Create(): void {
    console.log(this.specialit)
    
    this.specialiteService.Creer(this.image,this.libelle,this.description).subscribe(
     { next:
      data => {
        console.log(data);
		this.popUp();
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        //this.retour();
      },
      
      error: err => {
        this.errorMess = err.error.message;
        this.isSignUpFailed = true;
      }
    }
    );
  }


  Delete(id:any){
	this.specialiteService.DeleteSpecialite(id).subscribe({
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
			text: "Etes-vous sûre de vouloir supprimer la specialite ?",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Confimer',
			cancelButtonText: 'Annuler',
			// reverseButtons: true
		}).then((result) => {
			if (result.isConfirmed) {
			this.Delete(id);
			window.location.reload();
			// this.router.navigateByUrl('/specialites', {skipLocationChange: true}).then(() => {
			// 	this.router.navigate(["/specialites"])
			// 	})
			// this.storage.signOut();
			// window.location.reload();
			}
		})

}


	
		  listeSpecialiite(): void {
			this.specialiteService.liste().subscribe(
			  data => {
				console.log(data);
				this.specialites = data;
				this.NbreSpecialite = this.specialites.length
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
			  text: 'Specialite creer avec success!!',
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
				// this.router.navigateByUrl('/specialites', {skipLocationChange: true}).then(() => {
				//   this.router.navigate(["/specialites"])
				// })
			  }
			})
		
		  }

	      //Pop up de enregistrement reçu
		  MessageSuccess(){
			Swal.fire({
			  title: "Specialite creer avec succes",
			  showConfirmButton: true,
			  confirmButtonText: "OK",
			  confirmButtonColor: '#FF7900',
			  heightAuto: false
			}).then((result) => {
			  if (result.isConfirmed) {
			    // this.router.navigateByUrl('/clinics', {skipLocationChange: true}).then(() => {
				// 	this.router.navigate(["/clinics"])
				//   })
			}else if (result.isDenied) {
				//this.router.navigateByUrl('/clinics')
			}
		  });
		  }


		  back(): void {
			window.history.back()
		  }

}

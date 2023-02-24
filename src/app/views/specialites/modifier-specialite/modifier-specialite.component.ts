import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecialiteService } from 'src/app/services/specialite.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifier-specialite',
  templateUrl: './modifier-specialite.component.html',
  styleUrls: ['./modifier-specialite.component.scss']
})
export class ModifierSpecialiteComponent implements OnInit{
  detailSpec: any;
  libelleMod: any;
  descriptionMod: any;
  searchText:any;
	p:any;
	libelle!: string;
	image: any;
	description!: string;
	NbreSpecialite: any;
  idSpecialite: any;
  id: any;
  errorMess: any;
  updateFailed= false;
  alertImage: any;

   constructor(private route: ActivatedRoute,
    private router: Router, public specialiteService: SpecialiteService){}

  ngOnInit(): void {
      const id = this.route.snapshot.params['id'];
      console.log("param id => "+ id)

    this.specialiteService.detail(id).subscribe(
      (data) => {
        this.detailSpec = data;
        console.log(this.detailSpec)
        this.id = this.detailSpec.idSpecialite
        this.libelleMod = this.detailSpec.libelleSpecialite
        this.descriptionMod = this.detailSpec.descriptionSpecialite
        console.log(this.id)
        console.log(this.libelleMod)
        console.log(this.descriptionMod)
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

              	//La creation de la specialite
		UpdateSpecialite(): void {
			this.specialiteService.Update(this.image,this.libelleMod,this.descriptionMod,this.id).subscribe(
			 { next:
			  data => {
			    console.log(data);
          console.log(this.id)
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
          this.errorMess = err.body.message;
          this.updateFailed = true;
          }
        
			}
			);
			}

      popUp() {
        Swal.fire({
          position:'center',
          // title: 'Géo-clinique',
          text: 'Specialite modifier avec success!!',
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
          this.router.navigateByUrl('/specialites', {skipLocationChange: true}).then(() => {
            this.router.navigate(["/specialites"])
          })
          // window.location.reload();
          }
        })
      
        }


        retour(): void {
          window.history.back()
        }


}

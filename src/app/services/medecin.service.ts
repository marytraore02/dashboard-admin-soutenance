import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Medecin } from '../models/medecin';
import { StorageService } from '../_services/storage.service';



@Injectable({
  providedIn: 'root'
})
export class MedecinService {
  env = environment;

  constructor(private http: HttpClient,
    private storage: StorageService) { }

   //Liste total des medecins
   liste(): Observable<Medecin[]> {
    return this.http.get<Medecin[]>(`${this.env.api}` + `/medecin/read`);
  }

   //Creation d'une specialite
   Creer(file: any, nom: any, prenom: any, email:any, sexe: any,
    naissance:any, contact:any, idSpec:any): Observable<any> {
    const dat: FormData = new FormData();
    dat.append('file', file);
    let medecin = [{
      "nomMedecin": nom,
      "prenomMedecin": prenom,
      "emailMedecin": email,
      "sexeMedecin": sexe,
      "naissanceMedecin": naissance,
      "contactMedecin": contact,
    }]

    const currentUser = this.storage.getUser();
    console.log("current => "+currentUser.id);

    //console.log("data => "+ medecin);
    dat.append('data', JSON.stringify(medecin).slice(1, JSON.stringify(medecin).lastIndexOf(']')));
      return this.http.post(`${this.env.api}/medecin/create/new/${currentUser.id}/${idSpec}`, dat);
  }

      // List des medecins par clinique
      getByMedecinClinique(id: number): Observable<Medecin> {
        return this.http.get<Medecin>(`${this.env.api}` + `/medecin/getMedecin/${id}`);
      }
      
         // List des medecins par clinique
         getByMedecinCliniqueCurrent(id: number): Observable<Medecin> {
          const currentUser = this.storage.getUser();
          console.log("current => "+currentUser.id);
          return this.http.get<Medecin>(`${this.env.api}` + `/medecin/getMedecin/${currentUser.id}`);
        }

      // Details d'un medecin
      detail(id: number): Observable<Medecin> {
        return this.http.get<Medecin>(`${this.env.api}` + `/medecin/get/${id}`);
      }

       //Creation d'une clinique
   Update(file: any, nom: any, prenom: any, email: any, sexe: any, naissance: any, contact: any
    ): Observable<any> {
    const dat: FormData = new FormData();
    dat.append('file', file);
    let medecin = [{
      "nomMedecin": nom,
      "prenomMedecin": prenom,
      "emailMedecin": email,
      "sexeMedecin": sexe,
      "naissanceMedecin": naissance,
      "contactMedecin": contact,
    }]
    const currentUser = this.storage.getUser();
    console.log("current => "+currentUser.id);

    dat.append('data', JSON.stringify(medecin).slice(1, JSON.stringify(medecin).lastIndexOf(']')));
    return this.http.put(`${this.env.api}/medecin/update/${currentUser.id}`, dat);
  }

      //La fonction pour supprimer un medecin
      DeleteMedecin(id:Number):Observable<any>{
        return this.http.delete(`http://localhost:9000/medecin/delete/${id}`);
      }
    

}

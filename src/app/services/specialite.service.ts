import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Specialite } from '../models/specialite';


@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {
  env = environment;

  constructor(private http: HttpClient) { }

   //Liste des specialites
   liste(): Observable<Specialite[]> {
    return this.http.get<Specialite[]>(`${this.env.api}` + `/specialite/read`);
  }

     //Creation d'une specialite
     Creer(file: any, libelle: any, description: any): Observable<any> {
      const dat: FormData = new FormData();
      dat.append('file', file);
      let specialit = [{
        "libelleSpecialite": libelle,
        "descriptionSpecialite": description
      }]
      console.log(specialit);
      dat.append('data', JSON.stringify(specialit).slice(1, JSON.stringify(specialit).lastIndexOf(']')));
        return this.http.post(`${this.env.api}/specialite/create/new`, dat);
    }

           //Creation d'une clinique
   Update(file: any, libelleMod: any, descriptionMod: any, id:number): Observable<any> {
    const dat: FormData = new FormData();
    dat.append('file', file);
    let specialit = [{
      // "idSpecialite":id,
      "libelleSpecialite": libelleMod,
      "descriptionSpecialite": descriptionMod,
    }]
    console.log(specialit)
    dat.append('data', JSON.stringify(specialit).slice(1, JSON.stringify(specialit).lastIndexOf(']')));
    return this.http.put(`${this.env.api}/medecin/update/${id}`, dat);
  }

         //La fonction pour supprimer un patient
         DeleteSpecialite(id:Number):Observable<any>{
          return this.http.delete(`http://localhost:9000/specialite/delete/${id}`);
        }

           // Details d'une specialite
    detail(id: number): Observable<Specialite> {
      return this.http.get<Specialite>(`${this.env.api}` + `/specialite/get/${id}`);
    }

}

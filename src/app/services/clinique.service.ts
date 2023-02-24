import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Clinique } from '../models/Clinique';
import { Specialite } from '../models/specialite';



@Injectable({
  providedIn: 'root'
})
export class CliniqueService {
  env = environment;

  private BASE_URL = 'http://localhost:9000/clinic';
  private CALENDAR_LIST_URL = `${this.BASE_URL}\\rdv\\list`;
  private DELETE_EVENT_URL = `${this.BASE_URL}/rdv/`;
  private CHANGE_EVENT_STATUS_URL = `${this.BASE_URL}/rdv/status/`;
  private CHANGE_STATUS_CLINIQUE = `${this.BASE_URL}/status/`;

  constructor(private http: HttpClient) { }
  
   //Liste des cliniquew
   liste(): Observable<Clinique[]> {
    return this.http.get<Clinique[]>(`${this.env.api}` + `/clinic/read`);
  }

   //Creation d'une clinique
   Creer(file: any, fil:any, nom: any, contact: any, date: any, username: any, email: any, password: any,
    description:any, ville:any, adresse:any, longitude:any, latitude:any, idSpec:any): Observable<any> {
    const dat: FormData = new FormData();
    dat.append('file', file);
    dat.append('fil', file);
    let clinic = [{
      "nomEtPrenom": nom,
      "contact": contact,
      "date": date,
      "username": username,
      "email": email,
      "password": password,
      "descriptionClinique": description,
      "villeClinique": ville,
      "adresseClinique": adresse,
      "longitudeClinique": longitude,
      "latitudeClinique": latitude,
    }]
    console.log(clinic);
    dat.append('data', JSON.stringify(clinic).slice(1, JSON.stringify(clinic).lastIndexOf(']')));
    // dat.append('cliniqueRequest1', JSON.stringify(clinic).slice(1, JSON.stringify(clinic).lastIndexOf(']')));
    return this.http.post(`${this.env.api}/clinic/signup/${idSpec}`, dat);
  }

   //Creation d'une clinique
   Upadate(file: any, fil:any, nom: any, contact: any, date: any, username: any, email: any, password: any,
    description:any, ville:any, adresse:any, longitude:any, latitude:any, status:any, 
    specialite:any, id:number): Observable<any> {
    const dat: FormData = new FormData();
    dat.append('file', file);
    dat.append('fil', file);
    let clinic = [{
      "nomEtPrenom": nom,
      "contact": contact,
      "date": date,
      "username": username,
      "email": email,
      "password": password,
      "descriptionClinique": description,
      "villeClinique": ville,
      "adresseClinique": adresse,
      "longitudeClinique": longitude,
      "latitudeClinique": latitude,
      "statusClinique": status,
      "listeSpecialiteCli": specialite
    }]
    console.log(clinic);
    dat.append('data', JSON.stringify(clinic).slice(1, JSON.stringify(clinic).lastIndexOf(']')));
    return this.http.put(`${this.env.api}/clinic/update/${id}`, dat);
  }
    // Details d'une clinique
    detail(id: number): Observable<Clinique> {
      return this.http.get<Clinique>(`${this.env.api}` + `/clinic/get/${id}`);
    }

        // Delete d'une clinique
        delete(id: number): Observable<Clinique> {
          return this.http.delete<Clinique>(`http://localhost:9000/clinic/delete/${id}`);
        }

    // List des rendez-vous du medecin par jour
    calendarEvent(calendarRequest: any, id:number): Observable<any> {
      let MedecinRequest = {
        
          "medecinId":id,
          "date": calendarRequest
      
      }
      console.log(MedecinRequest)
      return this.http.post(`${this.env.api}/clinic/rdv/list/${id}`, MedecinRequest);
      // return this.http.post(this.CALENDAR_LIST_URL+${id}, calendarRequest);
    }
  
    // La methode pour supprimer un rendez-vous
    deleteEvent(rdvId: number): Observable<any> {
      return this.http.delete(this.DELETE_EVENT_URL + rdvId);
    }
  
    // Change Event Status
    changeEventStatus(rdvId: number): Observable<any> {
      return this.http.post(this.CHANGE_EVENT_STATUS_URL + rdvId, {});
    }

     // Change Event Status
     changeStatusClinique(id: number): Observable<any> {
      return this.http.post(this.CHANGE_STATUS_CLINIQUE + id, {});
    }

       // List des notifications
       getAllNotification(): Observable<any> {
        return this.http.get(`http://localhost:9000/notification/read`);
      }



}

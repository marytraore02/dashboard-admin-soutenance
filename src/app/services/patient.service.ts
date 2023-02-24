import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient';
import { Feedback } from '../models/feedback';


@Injectable({
  providedIn: 'root'
})
export class PatientService {
  env = environment;
  
  private BASE_URL = 'http://localhost:9000/patient';
  private FEEDBACK_URL = `${this.BASE_URL}\\mail\\feedback`;

  constructor(private http: HttpClient) { }

   //Liste des specialites
   liste(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.env.api}` + `/patient/read`);
  }

   //Creation d'une specialite
   Creer(file: any, nom: any, contact: any, date: any, username: any, email: any, password: any,
    sexe:any,): Observable<any> {
    const dat: FormData = new FormData();
    dat.append('file', file);
    let patient = [{
      "nomEtPrenom": nom,
      "contact": contact,
      "date": date,
      "username": username,
      "email": email,
      "password": password,
      "sexePatient": sexe,
    }]
    console.log(patient);
    dat.append('data', JSON.stringify(patient).slice(1, JSON.stringify(patient).lastIndexOf(']')));
      return this.http.post(`${this.env.api}/patient/signup`, dat);
  }

      //La fonction pour supprimer un patient
      DeletePatient(id:Number):Observable<any>{
        return this.http.delete(`http://localhost:9000/patient/delete/${id}`);
      }
    

       // Feedback
  feedback(feedbackData: Feedback): Observable<any> {
    return this.http.post(`localhost:9000/patient/mail/feedback`, feedbackData);
  }

     //Liste des specialites
     listeFeedback(): Observable<any> {
      return this.http.get(`${this.env.api}` + `/mail/read`);
    }


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RendezvousService {

  env = environment;
  constructor(private http: HttpClient) { }
    
      // List des rendez-vous
      getAllRendezvous(): Observable<any> {
        return this.http.get(`http://localhost:9000/rendezvous/read`);
      }

      // List des rendez-vous
      getAllRendezvousValide(): Observable<any> {
        return this.http.get(`http://localhost:9000/rendezvous/rendezvousvalide`);
      }

      // List des rendez-vous
      getAllRendezvousNonValide(): Observable<any> {
        return this.http.get(`http://localhost:9000/rendezvous/rendezvousnonvalide`);
      }

       // List des rendez-vous par medecin
       getRdvMedecin(id: number): Observable<any> {
        return this.http.get(`${this.env.api}` + `/rendezvous/getRdvMedecin/${id}`);
      }



}

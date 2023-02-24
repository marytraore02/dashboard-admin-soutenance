import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit{

  listFeedback: any;
  NbreFeedback: any;

  constructor(private patientService: PatientService){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
    //this.listeFeedback();
  }

    
  listeFeedback(): void {
		this.patientService.listeFeedback().subscribe(
		  data => {
			console.log(data);
			this.listFeedback = data;
			console.log(this.listFeedback)
			this.NbreFeedback = this.listFeedback.length
		  },
		  err => {
			console.log(err);
		  }
		);
	  }
  

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback';
import { PatientService } from 'src/app/services/patient.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit{
  isSuccessful = false;
  isSignUpFailed = false;
  errorMess = '';

  feedbackData: Feedback = {id: 0, name: '', email: '', contenue: '', date: ''};


  constructor(private patientService: PatientService,
    private router: Router){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  sendFeedback() {
    this.patientService.feedback(this.feedbackData)
    .subscribe(
      res => {
        console.log('Status ' + res.message);
            this.popUp()
      },
      err => {
        console.log('Please Try again later.');
      }
    )
  }


  popUp() {
    Swal.fire({
      position:'center',
      title: 'Géo-clinique',
      text: 'Message envoyé avec success',
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
        this.router.navigateByUrl('/feedback', {skipLocationChange: true}).then(() => {
          this.router.navigate(["/feedback"])
          //this.reloadPage();
        })
      }
    })

  }

}

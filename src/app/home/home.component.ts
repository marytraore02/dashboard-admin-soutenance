import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

interface IUser {
  id: number;
  avatar: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  content?: string;

  public users: IUser[] = [
    {
      id: 1,
      avatar: './assets/images/avatars/1.jpg',
    },
    {
      id: 2,
      avatar: './assets/img/avatars/2.jpg',
    },
    {
      id: 3,
      avatar: './assets/images/avatars/3.jpg',
    },
    {
      id: 4,
      avatar: './assets/img/avatars/4.jpg',
    },
  ];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // this.userService.getPublicContent().subscribe({
    //   next: data => {
    //     this.content = data;
    //   },
    //   error: err => {console.log(err)
    //     if (err.error) {
    //       this.content = JSON.parse(err.error).message;
    //     } else {
    //       this.content = "Error with status: " + err.status;
    //     }
    //   }
    // });
  }
}

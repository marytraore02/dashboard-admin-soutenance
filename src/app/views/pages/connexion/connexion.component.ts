import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { StorageService } from 'src/app/_services/storage.service';
import { Login } from './models/login';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit{

  signinData: Login = {usernameOrEmail: '', password: ''};
  popupResult!: boolean;
  popupMessage = '';

  showAdminBoard = false;
  showModeratorBoard = false;
  showUserBoard = false;
  username?: string;

  form: any = {
    username: null,
    password: null,
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private storage: StorageService
  ) {}



  ngOnInit(): void {
    this.isLoggedIn = !!this.storage.getToken();

    if (this.isLoggedIn) {
      const user = this.storage.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.showUserBoard = this.roles.includes('ROLE_USER');

      this.username = user.username;
    }

    if (this.storage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.storage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: (data) => {
        this.storage.saveToken(data.accessToken);
        this.storage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storage.getUser().roles;
        //this.reloadPage();
        this.navigate();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
    });
  }

  logout(): void {
    this.storage.signOut();
    window.location.reload();
  }

  navigate() {
    this.router.navigateByUrl('/dashboard');
  }

  reloadPage(): void {
    window.location.reload();
  }

//   signinUser() {
//     this.authservice.login(this.signinData)
//     .subscribe(
//       res => {
//         console.log('Access Token = ' + res.accessToken);
//         // Save the Token
//         localStorage.setItem('token', res.accessToken);
//         this.router.navigate(['/calendar']);
//       },
//       err => {
//         console.log('error = >' + err.message);
//         this.popupResult = err.success;
//         this.popupMessage = err.message;
//         if(err instanceof HttpErrorResponse) {
//           if(err.status === 401){
//             this.popupResult = false;
//             this.popupMessage = '(Username/email) et/ou mot de passe incorrecte.';
//           }
//         }
        
//       }
//     // )
// }


}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-login-rui',
  templateUrl: './login-rui.component.html',
  styleUrls: ['./login-rui.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class LoginRUIComponent {
  isLoggedIn: boolean = false;
  userRoleDD: boolean = false;
  passwordState: boolean = false;
  passwordType = "password";
  errorMessage = "";
  isPassword = false;

  userName = "";
  passWord = "";

  constructor(private router: Router, private authService: AuthService ) {
    if (typeof window !== 'undefined' && document.cookie === '') {
      localStorage.clear();
    }
  }

  users = [
    {
      order: 0,
      userRole: "User",
      returnFn: () => { return "User"; }
    },
    {
      order: 1,
      userRole: "Maintainer",
      returnFn: () => { return "Maintainer"; }
    },
    {
      order: 2,
      userRole: "Administrator",
      returnFn: () => { return "Administrator"; }
    }
  ];

  defaultUser = this.users[0].userRole;

  changeUserRole(order: number) {
    this.defaultUser = this.users[order].userRole;
  }

  userRoleOC() {
    this.userRoleDD = !this.userRoleDD;
  }

  lookPassword() {
    this.passwordState = !this.passwordState;
    this.passwordType = this.passwordState ? "text" : "password";
  }

  validateValue() {
    if (this.userName === "" && this.passWord === "") {
      this.errorMessage = "*Username and Password are Required";
      return;
    } else if (this.userName === "") {
      this.errorMessage = "*Username is Required";
      return
    }
    else if (this.passWord === ""){
      this.errorMessage = "*Password is Required"
      return
    }
    else {
      this.errorMessage = "";
      console.log({
        "userName" : this.userName,
        "passWord" : this.passWord,
        "userRole" : this.defaultUser
      });

      fetch(`http://${environment.API_URL}:3000/auth/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          user: {
            name: this.userName,
            role: this.defaultUser, // Corrected this line
            password: this.passWord,
          },
        }),
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 401 || res.status === 404) {
          this.errorMessage =
            "*Wrong password or user with this role doesn't exist";
        }
        throw new Error('Login failed');
      })
      .then((data) => {
        if (data.user) {
          this.router.navigate(['app']);
          this.authService.login(`_user=${JSON.stringify(data.user)}`);
        }
        console.log(data.user);
      })
      .catch((err) => console.error(err));

      // this.userName = ""; 
      // this.passWord = "";
      this.defaultUser = this.users[0].userRole; // Reset to default user role
    }
  }
}

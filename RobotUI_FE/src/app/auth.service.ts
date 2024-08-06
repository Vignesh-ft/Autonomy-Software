import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loggedInKey = 'loggedIn';

  private isCookieEmpty(): boolean {
    return document.cookie === '';
  }

  // Simulating user login
  login(user: string) {
    if (this.isCookieEmpty()) document.cookie = user; console.log("Login Button User print:   ",user)
  }

  // Simulating user logout
  logout() {
    if (!this.isCookieEmpty() ) {
      document.cookie = ""
      return;
    }
  }

  // Checking if the user is logged in
  isLoggedIn(): boolean {
    if (document.cookie !== '') return true;
    return false;
  }
}
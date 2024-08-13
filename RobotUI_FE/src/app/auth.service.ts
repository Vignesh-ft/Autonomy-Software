import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookieService:CookieService){}

  clearCookies() {
    console.log("Cookies Cleared")
    this.cookieService.deleteAll()
  }
  private readonly loggedInKey = 'loggedIn';

  private isCookieEmpty(): boolean {
    return document.cookie === '';
  }

  // Simulating user login
  login(user: string) {
    if (this.isCookieEmpty()) document.cookie = user;
  }

  // Simulating user logout
  logout() {
    this.clearCookies()
    window.location.reload()
    if (!this.isCookieEmpty() ) {
      this.clearCookies()
      window.location.reload()
      return;
    }
  }

  // Checking if the user is logged in
  isLoggedIn(): boolean {
    if (document.cookie !== '') return true;
    return false;
  }
}
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: any = null;
  currentUser$: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) {

  }

  login() {
  }

  async signIn(email: string, password: string) {
    const user = await this.angularFireAuth.signInWithEmailAndPassword(email, password);
    if (user) {
      this.router.navigateByUrl('/admin');
    };
    return user;
  }

  async isUserLoggined(): Promise<boolean> {
    const user = await this.angularFireAuth.currentUser;
    this.angularFireAuth.idToken
    if (user) {
      return true;
    };
    return false;
  }

  logout() {
  }

  async getUserToken() {
    const user = await this.angularFireAuth.currentUser;
    await user?.getIdToken();
  }
}

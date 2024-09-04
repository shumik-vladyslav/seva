import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private angularFireAuth: AngularFireAuth,
  ) { 
    this.form = fb.group({
      email: fb.control('', [Validators.email]),
      password: fb.control('', [Validators.minLength(4)]),
    });

    angularFireAuth.onAuthStateChanged((user) => {
      if(user) {
        localStorage.setItem('currentUser', JSON.stringify((user.multiFactor as any)?.user?.accessToken));
        router.navigateByUrl('/admin');
      } else {
        localStorage.removeItem('currentUser');
      }
    })
  }

  ngOnInit(): void {
  }

  async login() {
    const values = this.form.value;
    const user = await this.authService.signIn(values.email, values.password);
    if (!user) {
      this.openSnackBar("Неверный логин или пароль!")
    }
  }

  openSnackBar(message:string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      duration: 3000,
    });
  }
}

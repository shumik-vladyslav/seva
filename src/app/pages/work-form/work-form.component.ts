import { Component, Inject, OnInit } from '@angular/core';
import { collection, Firestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { addDoc } from 'firebase/firestore';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';

@Component({
  selector: 'app-work-form',
  templateUrl: './work-form.component.html',
  styleUrls: ['./work-form.component.scss']
})
export class WorkFormComponent implements OnInit {
  form: any;
  initForm() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      phone: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
    });
  }

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firestore: Firestore,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initForm()
  }
  closeModal() {
    this.dialog.closeAll()
  }
  sendMessage() {
    if (this.form.valid) {
      let obj = {
       data:  this.data,
       created: JSON.stringify(new Date()),
       message: this.form.value
      }
      addDoc(collection(this.firestore, 'message'), obj).then(()=>{
        this.openSnackBar('Заявка Оставленна!')
        this.dialog.closeAll()
      }).catch(err=>{
        this.openSnackBar(err)
        this.dialog.closeAll()
      })
    }
    this.closeModal()
  }

  openSnackBar(message:string){
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      duration: 1000,
    });
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { collection, Firestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { addDoc } from 'firebase/firestore';

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
       message: this.form.value
      }
      addDoc(collection(this.firestore, 'message'), obj)
      this.dialog.closeAll()
    }
    this.closeModal()
  }
}

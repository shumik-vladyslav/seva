import { Component, Inject, OnInit } from '@angular/core';
// import { collection, collectionData, Firestore } from '@angular/fire/firestore';
// import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-apply',
  templateUrl: './form-apply.component.html',
  styleUrls: ['./form-apply.component.scss']
})
export class FormApplyComponent implements OnInit {
  // form: any;
  // categorys$: Observable<any[]>;
  // categorys = [];
  // collections: any;

  // initForm() {
  //   const date = new Date();
  //   const day = String(date.getDate()).padStart(2, '0');
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const year = date.getFullYear();
  //   const formattedDate = `${day}/${month}/${year}`;
  //   this.form = this.fb.group({
  //     name: [null, Validators.required],
  //     phone: [null, [Validators.required]],
  //     email: [null, [Validators.required, Validators.email]],
  //     category: [null, [Validators.required]],
  //     date: [formattedDate]
  //   });
  // }

  constructor(
    private dialogRef: MatDialogRef<FormApplyComponent>,
    // private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    // private firestore: Firestore
  ) {
    // this.categorys$ = this.data.categories
  }

  ngOnInit(): void {
    // this.initForm();
    // this.categorys$.subscribe(e => {
    //   this.categorys = JSON.parse(JSON.stringify(e));
    // })
  }

  closeModal(form: any) {
    this.dialogRef.close(form);
  }

  goToUrl(url: string) {
    window.open(url);
    this.closeModal(null);
  }

  sendMessage() {
    // if (this.form.valid) {
    //   this.closeModal(this.form)
    // } else {
      // this.closeModal(null);
    // }
  }
}

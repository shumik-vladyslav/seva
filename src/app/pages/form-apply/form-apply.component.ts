import { Component, Inject, OnInit } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-apply',
  templateUrl: './form-apply.component.html',
  styleUrls: ['./form-apply.component.scss']
})
export class FormApplyComponent implements OnInit {
  form: any;
  categorys$: Observable<any[]>;
  categorys = [];
  collections: any;

  initForm() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      phone: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      category: [null, [Validators.required]]
    });
  }

  constructor(
    private dialogRef: MatDialogRef<FormApplyComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firestore: Firestore
  ) {
    this.collections = collection(firestore, 'category');
    this.categorys$ = collectionData(this.collections, { idField: 'id' });
  }

  ngOnInit(): void {
    this.initForm();
    this.categorys$.subscribe(e => {
      this.categorys = JSON.parse(JSON.stringify(e));
    })
  }

  closeModal(form: any) {
    this.dialogRef.close(form);
  }

  sendMessage() {
    if (this.form.valid) {
      this.closeModal(this.form)
    } else {
      this.closeModal(null);
    }
  }
}

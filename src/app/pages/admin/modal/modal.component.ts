import { Component, Inject, OnInit } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  collections: any;

  constructor(
    private firestore: Firestore,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
  }

  createOrEdit(data: any) {
    if (data.type == 'create') {
      if (data.form.valid) {
        addDoc(collection(this.firestore, data.category), data.form.value)
      }
    }
    else {
      setDoc(doc(this.firestore, data.category, data.id as string), data.form.value)
    }
  }

  upload(event: any){

  }
}

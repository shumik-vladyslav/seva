import { Component, OnInit } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-revards',
  templateUrl: './revards.component.html',
  styleUrls: ['./revards.component.scss']
})
export class RevardsComponent implements OnInit {
  revards$?: Observable<any[]>;
  collections
  form?: any;

  constructor(
    private firestore: Firestore,
    private dialogRef: MatDialog,
    private fb: FormBuilder,
  ) {

    this.collections = collection(firestore, 'revards');
    this.revards$ = collectionData(this.collections, { idField: 'id' });

  }
  ngOnInit(): void {
    this.initForm();
  }


  initForm() {
    this.form = this.fb.group({
      title: [null, Validators.required],
      desc: [null, Validators.required],
      img: [null, Validators.required],
      price: [null, Validators.required],
      bought: [null, Validators.required],
      remainder: [null, Validators.required]
    });
  }


  createRevard(){
    let obj = {
      type: 'create',
      category: 'revards',
      form: this.form
    }

    let dialog = this.dialogRef.open(ModalComponent, {
      width: '70%',
      data: obj,
    });

    dialog.afterClosed().subscribe(e => {
      this.initForm();
    })
  }

  editRevard(item: any){
    this.form.patchValue(item)
    let obj = {
      type: 'edit',
      category: 'revards',
      form: this.form,
      id: item.id
    }
    let dialog = this.dialogRef.open(ModalComponent, {
      width: '70%',
      data: obj,
    });

    dialog.afterClosed().subscribe(e => {
      this.initForm();
    })

  }
  deleteRevard(id: any){
    deleteDoc(doc(this.firestore, `revards/${id}`));
  }




}

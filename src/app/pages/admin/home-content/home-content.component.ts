import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss']
})
export class HomeContentComponent implements OnInit {
  content$: Observable<any[]>;
  public form: FormGroup;

  collections
  constructor(
    private firestore: Firestore,
    private dialogRef: MatDialog,
    private _snackBar: MatSnackBar
    ) {

    this.collections = collection(firestore, 'content');
    this.content$ = collectionData(this.collections, {idField: 'id'});
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
      img: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }

  EditContent(item: any){
    this.form.reset()
    this.form.patchValue(item)
    let obj={
      type: 'edit',
      category: 'content',
      form: this.form,
      id: item.id
    }
    this.dialogRef.open(ModalComponent, {
      width: '90%',
      data:  obj,
    });
  }

}

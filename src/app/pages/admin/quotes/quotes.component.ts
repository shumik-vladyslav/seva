import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {

  quotes$: Observable<any[]>;

  collections: any;

  public form: FormGroup;

  constructor(
    private firestore: Firestore,
    private dialogRef: MatDialog
    ) {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
    });

    this.collections = collection(firestore, 'quotes');
    this.quotes$ = collectionData(this.collections, {idField: 'id'});
  }

  ngOnInit(): void {

  }

  createQuotes(){
    this.form.reset()
    let obj={
      type: 'create',
      category: 'quotes',
      form: this.form
    }
    this.dialogRef.open(ModalComponent, {
      width: '90%',
      data:  obj,
    });
  }
  EditQuotes(item: any){
    this.form.patchValue(item)
    let obj={
      type: 'edit',
      category: 'quotes',
      form: this.form,
      id: item.id
    }
    this.dialogRef.open(ModalComponent, {
      width: '90%',
      data:  obj,
    });
  }

  deleteQuote(id: string) {
    deleteDoc(doc(this.firestore, `quotes/${id}`));
  }

}

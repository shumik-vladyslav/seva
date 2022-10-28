import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {

  quotes$: Observable<any[]>;

  collections: any;

  public form: FormGroup;

  constructor(private firestore: Firestore) {
    this.form = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
    });

    this.collections = collection(firestore, 'quotes');
    this.quotes$ = collectionData(this.collections, {idField: 'id'});
  }

  ngOnInit(): void {

  }

  createQuote() {
    addDoc(this.collections,  {
      title: this.form.controls["title"].value,
      description: this.form.controls["description"].value
    });
  }

  deleteQuote(id: string) {
    deleteDoc(doc(this.firestore, `quotes/${id}`));
  }

}

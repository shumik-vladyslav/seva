import { Component, OnInit } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  collections: any;
  message$: any;
  constructor(
    private firestore: Firestore
  ) {
    this.collections = collection(firestore, 'message');
    this.message$ = collectionData(this.collections, {idField: 'id'});
   }

  ngOnInit(): void {
    this.message$.subscribe((e:any)=>{
      console.log(e);

    })
  }
  deleteItem(id: string){
    deleteDoc(doc(this.firestore, `message/${id}`));
  }
}

import { Component, OnInit } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  collections: any;
  message$: any;
  constructor(
    private firestore: Firestore,
    private dialogRef: MatDialog
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
    let confDialog = this.dialogRef.open(ConfirmComponent, {
      width: '30%',
    })
    confDialog.afterClosed().subscribe(e=>{
      if(e) deleteDoc(doc(this.firestore, `message/${id}`));
    })

  }
}

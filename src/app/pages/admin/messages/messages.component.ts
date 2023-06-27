import { Component, OnInit } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { ConfirmComponent } from '../confirm/confirm.component';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  collections: any;
  collectionsWork: any;
  message$: any;
  workOffer$: any;
  json = JSON;
  sortedItems : any[] = [];
  messages : any[] = [];
  messagesDontate : any[] = [];
  filterControl = this.fb.control('')

  constructor(
    private firestore: Firestore,
    private fb: FormBuilder,
    private dialogRef: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.collections = collection(firestore, 'message');
    this.message$ = collectionData(this.collections, {idField: 'id'});
    this.collectionsWork = collection(firestore, 'workOffer');
    this.workOffer$ = collectionData(this.collectionsWork, { idField: 'id' });
   }

  ngOnInit(): void {
  this.filterControl.valueChanges.subscribe(vl=> {
    this.sortedItems = this.messages
    this.sortedItems = this.sortedItems.filter(elem=>{
      if(vl){
        return vl?.id === elem.data.val.id
      }
      return elem      
    })

  })
    this.message$.subscribe((items : any) => {
      this.sortedItems = items.sort((a: any , b: any) => {
        if (!a.created || !b.created) {
          if (!a.created) {
            return 1;
          } else {
            return -1;
          }
        }
        return new Date(JSON.parse(b.created)).getTime() - new Date(JSON.parse(a.created)).getTime();
      });
      this.messages = this.sortedItems
      this.messagesDontate = items.filter((e:any)=>{
        return e?.data.type =='donate'
      } )
    });
  }
  
  deleteItem(id: string){
    let confDialog = this.dialogRef.open(ConfirmComponent, {
      width: '30%',
      scrollStrategy: new NoopScrollStrategy()
    })
    confDialog.afterClosed().subscribe(e=>{
      if(e) {
        deleteDoc(doc(this.firestore, `message/${id}`)).then(()=>{
          this.openSnackBar('Сообщение Удалено')
        }).catch(err=>{
          this.openSnackBar(err)
        })
      }
    })

  }
  openSnackBar(message:string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      duration: 1000,
    });
  }
}

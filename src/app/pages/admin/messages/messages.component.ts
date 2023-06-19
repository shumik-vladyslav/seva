import { Component, OnInit } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { ConfirmComponent } from '../confirm/confirm.component';
import { NoopScrollStrategy } from '@angular/cdk/overlay';

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
    private dialogRef: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.collections = collection(firestore, 'message');
    this.message$ = collectionData(this.collections, {idField: 'id'});
   }

  ngOnInit(): void {}
  
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

import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Firestore, collectionData, collection, addDoc, deleteDoc, doc } from '@angular/fire/firestore';
import { ModalComponent } from '../admin/modal/modal.component';
import { Observable } from 'rxjs';
import { ConfirmComponent } from '../admin/confirm/confirm.component';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';

@Component({
  selector: 'samayas-services',
  templateUrl: './samayas-services.component.html',
  styleUrls: ['./samayas-services.component.scss']
})
export class SamayasServicesComponent implements OnInit {
  form?: any;
  samayasServices$: Observable<any[]>;
  collectionsCateg
  categorys$: Observable<any[]>;
  dialog: any
  collections: any;
  isBigDesc = false;
  
  constructor(
    private firestore: Firestore,
    private dialogRef: MatDialog,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) { 
    this.collections = collection(firestore, 'samayasServices');
    this.samayasServices$ = collectionData(this.collections, { idField: 'id' });

    this.collectionsCateg = collection(firestore, 'samayaCategories');
    this.categorys$ = collectionData(this.collectionsCateg, {idField: 'id'});
  }

  ngOnInit(): void {
    this.initForm()
  }

  createWorkOffer() {
    let obj = {
      type: 'create',
      category: 'samayasServices',
      form: this.form
    }
    let dialog = this.dialogRef.open(ModalComponent, {
      width: '90%',
      data: obj,
      scrollStrategy: new NoopScrollStrategy()
    });
    dialog.afterClosed().subscribe(e => {
      this.initForm();
    })
  }

  initForm() {
    this.form = this.fb.group({
      title: [null, Validators.required],
      category: [null],
      bigDesc: [null, Validators.required],
      details: this.fb.group({
        contacts: [null],
        name: [null],
        cost: [null],
      }),
      img: [null, Validators.required],
      date: Math.floor(new Date().getTime() / 1000)
    });
  }

  showDesc() {
    this.isBigDesc = !this.isBigDesc;
  }

  deleteOffer(id: string) {
    let confDialog = this.dialogRef.open(ConfirmComponent, {
      width: '30%',
      scrollStrategy: new NoopScrollStrategy()
    })
    confDialog.afterClosed().subscribe(e=>{
      if(e) deleteDoc(doc(this.firestore, `samayasServices/${id}`)).then(()=>{
        this.openSnackBar('Служение Удалено')
      }).catch(err=>{
        this.openSnackBar(err)
      })
    })
  }
  openSnackBar(message:string){
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      duration: 1000,
    });
  }

  EditOffer(item: any) {
    item.date = Math.floor(new Date().getTime() / 1000);
    this.form.patchValue(item);
    let obj = {
      type: 'edit',
      category: 'samayasServices',
      form: this.form,
      id: item.id
    }
    let dialog = this.dialogRef.open(ModalComponent, {
      width: '90%',
      data: obj,
      scrollStrategy: new NoopScrollStrategy()
    });
    dialog.afterClosed().subscribe(e => {
      this.initForm();
    })
  }
}

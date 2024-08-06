import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Firestore, collectionData, collection, doc, deleteDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { ConfirmComponent } from '../confirm/confirm.component';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-work-offers',
  templateUrl: './work-offers.component.html',
  styleUrls: ['./work-offers.component.scss']
})
export class WorkOffersComponent implements OnInit {

  workOffer$: Observable<any[]>;
  dialog: any
  collections: any;
  form?: any;
  isBigDesc = false
  collectionsCateg:any;
  categorys$: Observable<any>

  constructor(
    private firestore: Firestore,
    private dialogRef: MatDialog,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.collections = collection(firestore, 'workOffer');
    this.workOffer$ = collectionData(this.collections, { idField: 'id' });
    this.collectionsCateg = collection(firestore, 'category');
    this.categorys$ = collectionData(this.collectionsCateg, {idField: 'id'});

  }

  initForm() {
    this.form = this.fb.group({
      title: [null, Validators.required],
      subTitle: [null, Validators.required],
      category: [null],
      bigDesc: [null, Validators.required],
      details: this.fb.group({
        location: [null],
        contacts: [null],
        timeOnDay: [null],
        fullTime: [false],
      }),
      isHot: [false],
      date: Math.floor(new Date().getTime() / 1000)
    });
  }

  deleteOffer(id: string) {
    let confDialog = this.dialogRef.open(ConfirmComponent, {
      width: '30%',
      scrollStrategy: new NoopScrollStrategy()
    })
    confDialog.afterClosed().subscribe(e=>{
      if(e) deleteDoc(doc(this.firestore, `workOffer/${id}`)).then(()=>{
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
      category: 'workOffer',
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

  showDesc(item:any, event: any) {
    if (!this.isBigDesc) {
      event.target.nextElementSibling.innerHTML = item.bigDesc
      this.isBigDesc = true
    }
    else{
      event.target.nextElementSibling.innerHTML = ''
      this.isBigDesc = false
    }
  }

  createWorkOffer() {
    let obj = {
      type: 'create',
      category: 'workOffer',
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

  ngOnInit(): void {
    this.initForm();
  }

}

import { Component, OnInit } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { ConfirmComponent } from '../confirm/confirm.component';
import { ModalComponent } from '../modal/modal.component';
import { NoopScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  public form: FormGroup;
  projects$: Observable<any[]>;
  collections: any;
  isBigDesc = false;

  constructor(
    private firestore: Firestore,
    private dialogRef: MatDialog,
    private _snackBar: MatSnackBar
    ) {

    this.collections = collection(firestore, 'projectContent');
    this.projects$ = collectionData(this.collections, {idField: 'id'});

    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      tag: new FormControl('', Validators.required),
      img: new FormControl(''),
      aim: new FormControl('', Validators.required),
      percent: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
      date: new FormControl(''),
      location: new FormControl('', Validators.required),
      supported: new FormControl('', Validators.required),
      bigDesc: new FormControl('', Validators.required),
      revards: new FormControl(null),
      addToSlider: new FormControl(false),

    });
  }

  createProject(){
    this.form.reset()
    let obj={
      type: 'create',
      category: 'projectContent',
      form: this.form
    }
    this.dialogRef.open(ModalComponent, {
      width: '90%',
      data:  obj,
      scrollStrategy: new NoopScrollStrategy()
    });
  }

  EditProj(item: any){
    this.form.reset()
    this.form.patchValue(item)
    let obj={
      type: 'edit',
      category: 'projectContent',
      form: this.form,
      id: item.id
    }
    this.dialogRef.open(ModalComponent, {
      width: '90%',
      data:  obj,
      scrollStrategy: new NoopScrollStrategy()
    });
  }


  deleteProj(id: string) {
    let confDialog = this.dialogRef.open(ConfirmComponent, {
      width: '30%',
      scrollStrategy: new NoopScrollStrategy()
    })
    confDialog.afterClosed().subscribe(e=>{
      if(e){
        deleteDoc(doc(this.firestore, `projectContent/${id}`)).then(()=>{
          this.openSnackBar('Проект Удалено')
        }).catch(err=>{
          this.openSnackBar(err)
        })
      }
    })
  }

  ngOnInit(): void { }

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

  openSnackBar(message:string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      duration: 1000,
    });
  }
}

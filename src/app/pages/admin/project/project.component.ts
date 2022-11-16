import { Component, OnInit } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';

import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmComponent } from '../confirm/confirm.component';
import { ModalComponent } from '../modal/modal.component';

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
    private dialogRef: MatDialog
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
      revards: new FormControl(null)

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
    });
  }

  EditProj(item: any){
    console.log(item);
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
    });
  }


  deleteProj(id: string) {
    let confDialog = this.dialogRef.open(ConfirmComponent, {
      width: '30%',
    })
    confDialog.afterClosed().subscribe(e=>{
      if(e)deleteDoc(doc(this.firestore, `projectContent/${id}`));
    })

  }


  createWorkOffer(){
    if(this.form.valid){
      addDoc(this.collections,  {
        title: this.form.controls["title"].value,
        tag: this.form.controls["tag"].value,
        img: this.form.controls["img"].value,
        aim: this.form.controls["aim"].value,
        percent: this.form.controls["percent"].value,
        desc: this.form.controls["desc"].value,

      });
    }
  }
  ngOnInit(): void {
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

}

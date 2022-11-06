import { Component, OnInit } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
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
    deleteDoc(doc(this.firestore, `projectContent/${id}`));
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



}

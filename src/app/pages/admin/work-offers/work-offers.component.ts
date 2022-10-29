import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Firestore, collectionData, collection, addDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-work-offers',
  templateUrl: './work-offers.component.html',
  styleUrls: ['./work-offers.component.scss']
})
export class WorkOffersComponent implements OnInit {
  public form: FormGroup;

  workOffer$: Observable<any[]>;

  collections: any;

  constructor(
    private firestore: Firestore,
    private dialogRef: MatDialog
    ) {

    this.collections = collection(firestore, 'workOffer');
    this.workOffer$ = collectionData(this.collections, {idField: 'id'});

    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      subTitle: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
      isHot: new FormControl(false)
    });
  }

  deleteOffer(id: string) {
    deleteDoc(doc(this.firestore, `workOffer/${id}`));
  }
  EditOffer(item: any){
    this.form.patchValue(item)
    let obj={
      type: 'edit',
      category: 'workOffer',
      form: this.form,
      id: item.id
    }
    this.dialogRef.open(ModalComponent, {
      width: '90%',
      data:  obj,
    });
  }

  createWorkOffer(){
    this.form.reset()
    let obj={
      type: 'create',
      category: 'workOffer',
      form: this.form
    }
    this.dialogRef.open(ModalComponent, {
      width: '90%',
      data:  obj,
    });

  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, Observable } from 'rxjs';
import { Firestore, collectionData, collection, addDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { AsyncPipe } from '@angular/common';

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

  constructor(
    private firestore: Firestore,
    private dialogRef: MatDialog,
    private fb: FormBuilder,
  ) {

    this.collections = collection(firestore, 'workOffer');
    this.workOffer$ = collectionData(this.collections, { idField: 'id' });

  }

  initForm() {
    this.form = this.fb.group({
      title: [null, Validators.required],
      subTitle: [null, Validators.required],
      desc: [null, Validators.required],
      bigDesc: [null, Validators.required],
      details: this.fb.group({
        location: [null],
        contacts: [null],
        timeOnDay: [null],
        fullTime: [false],
      }),
      isHot: [false]
    });
  }

  deleteOffer(id: string) {
    deleteDoc(doc(this.firestore, `workOffer/${id}`));
  }
  EditOffer(item: any) {
    this.form.patchValue(item)
    let obj = {
      type: 'edit',
      category: 'workOffer',
      form: this.form,
      id: item.id
    }
    let dialog = this.dialogRef.open(ModalComponent, {
      width: '90%',
      data: obj,
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
    });

    dialog.afterClosed().subscribe(e => {
      this.initForm();
    })
  }

  ngOnInit(): void {
    this.initForm();
  }

  // ------- load all big desc if need
  // initBigDesc() {
  //   this.workOffer$.pipe(debounceTime(600)).subscribe(e => {
  //     let elem = document.querySelectorAll('.bigDesc')
  //     if (elem.length) {
  //       if (e.length) {
  //         e.find((el, i) => {
  //           if (el?.bigDesc) {
  //             if (elem[i].innerHTML !== el?.bigDesc) {
  //               elem[i].innerHTML = el.bigDesc
  //             }
  //           }
  //         })
  //       }
  //     }
  //   })
  // }
}

import { Component, OnInit } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';
import { NoopScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss']
})
export class HomeContentComponent implements OnInit {
  content$: Observable<any[]>;
  public form: FormGroup;

  collections
  constructor(
    private firestore: Firestore,
    private dialogRef: MatDialog,
    ) {

    this.collections = collection(firestore, 'content');
    this.content$ = collectionData(this.collections, {idField: 'id'});
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      isTitle: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
      img: new FormControl('', Validators.required),
      date: new FormControl(null)
    });
  }

  ngOnInit(): void {
  }

  EditContent(item: any){
    this.form.reset()
    this.form.patchValue(item)
    let obj={
      type: 'edit',
      category: 'content',
      form: this.form,
      id: item.id
    }
    this.dialogRef.open(ModalComponent, {
      width: '90%',
      scrollStrategy: new NoopScrollStrategy(),
      data:  obj,
    });
  }

}

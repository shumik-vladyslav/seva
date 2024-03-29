import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection, doc, deleteDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { ConfirmComponent } from '../confirm/confirm.component';
import { ModalComponent } from '../modal/modal.component';
import { NoopScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {

  quotes$: Observable<any[]>;
  slides$: Observable<any[]>;
  collections: any;
  collectionsSld: any;

  public form: FormGroup;
  public formSlide: FormGroup;

  constructor(
    private firestore: Firestore,
    private dialogRef: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
    });
    this.formSlide = new FormGroup({
      title: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
      img: new FormControl('', Validators.required),
    });

    this.collections = collection(firestore, 'quotes');
    this.quotes$ = collectionData(this.collections, { idField: 'id' });
    this.collectionsSld = collection(firestore, 'slides');
    this.slides$ = collectionData(this.collectionsSld, { idField: 'id' });
  }

  ngOnInit(): void {}

  createQuotes() {
    this.form.reset()
    let obj = {
      type: 'create',
      category: 'quotes',
      form: this.form
    }
    this.dialogRef.open(ModalComponent, {
      width: '90%',
      scrollStrategy: new NoopScrollStrategy(),
      data: obj,
    });
  }

  createSlide() {
    this.formSlide.reset()
    let obj = {
      type: 'create',
      category: 'slides',
      form: this.formSlide
    }
    this.dialogRef.open(ModalComponent, {
      width: '90%',
      data: obj,
      scrollStrategy: new NoopScrollStrategy()
    });
  }

  EditQuotes(item: any) {
    this.form.patchValue(item)
    let obj = {
      type: 'edit',
      category: 'quotes',
      form: this.form,
      id: item.id
    }
    this.dialogRef.open(ModalComponent, {
      width: '90%',
      data: obj,
      scrollStrategy: new NoopScrollStrategy()
    });
  }

  EditSlide(item: any) {
    this.formSlide.patchValue(item)
    let obj = {
      type: 'edit',
      category: 'slides',
      form: this.formSlide,
      id: item.id
    }
    this.dialogRef.open(ModalComponent, {
      width: '90%',
      data: obj,
      scrollStrategy: new NoopScrollStrategy()
    });
  }
  deleteSlide(id: string, type: string) {
    let confDialog = this.dialogRef.open(ConfirmComponent, {
      width: '30%',
      scrollStrategy: new NoopScrollStrategy()
    })
    confDialog.afterClosed().subscribe(e=>{
      if(e){
        deleteDoc(doc(this.firestore, `${type}/${id}`)).then(()=>{
          this.openSnackBar('Слайд Удалено')
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

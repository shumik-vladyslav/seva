import { Component, OnInit } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { ConfirmComponent } from '../confirm/confirm.component';
import { ModalComponent } from '../modal/modal.component';
import { NoopScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  public form: FormGroup;
  categorys$: Observable<any[]>;
  collections: any;
  collectionsWork: any;
  workOffer$: Observable<any[]>;
  workOffer=[];

  constructor(
    private firestore: Firestore,
    private dialogRef: MatDialog,
    private _snackBar: MatSnackBar
    ) {
    this.collectionsWork = collection(firestore, 'workOffer');
    this.workOffer$ = collectionData(this.collectionsWork, { idField: 'id' });
    this.collections = collection(firestore, 'category');
    this.categorys$ = collectionData(this.collections, {idField: 'id'});

    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {}

  createCateg(){
    this.form.reset()
    let obj={
      type: 'create',
      category: 'category',
      form: this.form
    }
    this.dialogRef.open(ModalComponent, {
      width: '40%',
      scrollStrategy: new NoopScrollStrategy(),
      data: obj
    });
  }

  EditCateg(item: any){
    this.form.reset()
    this.form.patchValue(item)
    let obj={
      type: 'edit',
      category: 'category',
      form: this.form,
      id: item.id
    }
    this.dialogRef.open(ModalComponent, {
      width: '90%',
      data:  obj,
      scrollStrategy: new NoopScrollStrategy()
    });
  }

  deleteCateg(id: string) {
    let confDialog = this.dialogRef.open(ConfirmComponent, {
      width: '30%',
      scrollStrategy: new NoopScrollStrategy()
    })
    confDialog.afterClosed().subscribe(e=>{
      if(e){
        deleteDoc(doc(this.firestore, `category/${id}`)).then(()=>{
          this.openSnackBar('Категорию Удалено')

          this.filterUpdate(id)

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
  
  filterUpdate(id:any){
    this.workOffer$.subscribe(e=>{
      let offer
      offer= e.find(el=>el.category==id)
      if(offer && offer?.category){
        offer.category = null
        setDoc(doc(this.firestore, 'workOffer', offer.id as string), offer)
      }
    })
  }
}

import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { deleteObject, getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { MatChipInputEvent } from '@angular/material/chips';
import { AsyncPipe } from '@angular/common';
import { ConfirmComponent } from '../confirm/confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  providers: [AsyncPipe, ChangeDetectorRef as any],
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  revardsCtrl = new FormControl('');
  selectedRevards: any[] = [];
  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
  collectionsCateg:any;
  categorys$: Observable<any>

  allRevards= []
  isChangesField = false
  revardscopy$?: Observable<any>;
  revards$: any
  req: any = []
  collections: any;
  isUploaded = false;
  revardsEl?: any = []
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    uploadUrl: 'v1/images', // if needed
    customClasses: [ // optional
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'open-sans', name: 'Open-sans' },
      { class: 'playfair-display', name: 'Playfair-display' },
      { class: 'PT-Serif', name: 'PT-Serif' }
    ],
  };

  constructor(
    public async: AsyncPipe,
    private _ref: ChangeDetectorRef,
    private firestore: Firestore,
    private storage: Storage,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
  ) {
    this.collections = collection(firestore, 'revards');
    this.revards$ = collectionData(this.collections, { idField: 'id' });
    this.collectionsCateg = collection(firestore, 'category');
    this.categorys$ = collectionData(this.collectionsCateg, {idField: 'id'});

    this.revards$.subscribe((elem: any, i: any) => {
      this.revardsEl = elem
      this.allRevards = elem
      if (data.category === "projectContent") {
        if(data.form.value.revards?.length){
          this.selectedRevards = JSON.parse(JSON.stringify(data.form.value.revards))
          let result = this.revardsEl.filter((service:any) => this.selectedRevards.every(item => item.id !== service.id));
          this.revardsEl = result
        }
      }
      setTimeout(() => {
        console.log(this.revardsEl, this.selectedRevards, 2);
        this.revardscopy$ = this.revardsCtrl.valueChanges.pipe(
          startWith(null),
          map((rev: string | null) => (rev ? this.filter(rev) : this.revardsEl.slice())),
        );
      }, 200);
    })
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    event.chipInput!.clear();
  }

  remove(rev: string): void {
    this.data.form.markAsDirty();
    this.revards$.subscribe((elem: any) => {
      elem.filter((el: any) => {
        if (el.id === rev) {
          this.revardsEl.push(el)
          console.log(el, this.revardsEl);
          this.data.form.controls.revards.updateValueAndValidity();
          this.revardscopy$ = this.revardsCtrl.valueChanges.pipe(
            startWith(null),
            map((rev: string | null) => (rev ? this.filter(rev) : this.revardsEl.slice())),
          );
        }
      })
    })
    this.selectedRevards.filter((e, i) => {
      if (e.id == rev) {
        if (i >= 0) {
          this.selectedRevards.splice(i, 1);
        }
      }
    })
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.isChangesField = true
    let obj = {
      title: event.option.viewValue,
      id: event.option.value
    }
    this.selectedRevards.push(obj);
    this.fruitInput.nativeElement.value = '';
    this.revardsCtrl.setValue(null);
    this.data.form.markAsDirty();
  }

  filter(value: string): string[] {
    const filterValue = value;
    return this.revardsEl = this.revardsEl.filter((rev: any) => rev.id !== filterValue);
  }

  ngOnInit(): void {
  }
  createOrEdit(data: any) {
    if (data.category === "projectContent") {
      let result = this.allRevards.filter((v: any)=> {
        return this.selectedRevards.some((v2: any)=> {
             return v.id == v2.id ;
         })
       })
      this.data.form.get("revards").setValue(result);
    }

    if (data.type == 'create') {
      if (data.category === "projectContent") {
        data.form.value.date = new Date().toISOString()
      }
      if (data.form.valid) {
        addDoc(collection(this.firestore, data.category), data.form.value).then(()=>{
          this.openSnackBar('Успешно Создано')
          this.dialog.closeAll()
        }).catch(err=>{
          this.openSnackBar(err)
          this.dialog.closeAll()
        })
      }
    }
    else {
      if (data.form.valid) {
        setDoc(doc(this.firestore, data.category, data.id as string), data.form.value).then(()=>{
          this.openSnackBar('Успешно редактировано')
          this.dialog.closeAll()
        }).catch(err=>{
          this.openSnackBar(err)
          this.dialog.closeAll()
        })
      }
    }
  }

  upload(event: any): void {
    const file = event.target.files[0];
    console.log(event);

    this.uploadFile(this.data.category, file.name, file).then(data => {
      this.data.form.patchValue({
        img: data
      });
      this.isUploaded = true;
    })
      .catch(err => {
        console.log(err);
      })
  }

  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const ext = file!.name.split('.').pop();
    const path = `${folder}/${name}`; {
      if (file) {
        try {
          const storageRef = ref(this.storage, path);
          const task = uploadBytes(storageRef, file);
          await task;
          return await getDownloadURL(storageRef);
        } catch (e: any) {

          console.log(e);

          return e.message
        }
      } else {
        return '';
      }
    }
  }

  deleteImage(img?: string): void {
    let confDialog = this.dialog.open(ConfirmComponent, {
      width: '30%',
    })
    confDialog.afterClosed().subscribe(e=>{
      if(e) {
        img = img ? img : this.valueByControl('imagePath')
        this.isUploaded = false;
        const task = ref(this.storage, img);
        deleteObject(task).then(() => {
          this.openSnackBar('Изображение удалено');
          this.data.form.patchValue({
            img: null
          })
        }).catch(err=>{
          this.openSnackBar(err);
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

  valueByControl(control: string): string {
    return this.data.form.get(control)?.value;
  }
  ngOnDestroy(): void {
    if (this.data.category === "projectContent") {

      this.data.form.reset()
    }

  }
}

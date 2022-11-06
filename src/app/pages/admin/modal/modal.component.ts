import { Component, Inject, OnInit } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { deleteObject, getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  req: any = []
  collections: any;
  isUploaded = false;

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
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'open-sans', name: 'Open-sans'},
      {class: 'playfair-display', name: 'Playfair-display'},
      {class: 'PT-Serif', name: 'PT-Serif'}
    ],
  };

  constructor(
    private firestore: Firestore,
    private storage: Storage,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
  }

  createOrEdit(data: any) {
    if (data.type == 'create') {
      if (data.form.valid) {
        addDoc(collection(this.firestore, data.category), data.form.value)
        this.dialog.closeAll()
      }
    }
    else {
      if (data.form.valid) {
        setDoc(doc(this.firestore, data.category, data.id as string), data.form.value)
        this.dialog.closeAll()
      }
    }
  }

  upload(event: any): void {
    const file = event.target.files[0];
    console.log(event);

    this.uploadFile('images', file.name, file).then(data => {
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

  // -- delete Image if be need

  deleteImage(img?: string): void {
    console.log(img);

    img = img ? img : this.valueByControl('imagePath')
    this.isUploaded = false;
    const task = ref(this.storage, img);
    deleteObject(task).then(() => {
      console.log('File deleted successfully');
      this.data.form.patchValue({
        img: null
      })
    })
  }

  valueByControl(control: string): string {
    return this.data.form.get(control)?.value;
  }
}

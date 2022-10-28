import { Component, OnInit } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { deleteObject, getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  public form: FormGroup;
  workOffer$: Observable<any[]>;
  isUploaded = false
  collections: any;

  constructor(
    private firestore: Firestore,
    private storage: Storage,
    ) {

    this.collections = collection(firestore, 'projectContent');
    this.workOffer$ = collectionData(this.collections, {idField: 'id'});

    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      tag: new FormControl('', Validators.required),
      img: new FormControl(''),
      aim: new FormControl('', Validators.required),
      percent: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
      isHot: new FormControl(false)
    });
  }

  deleteOffer(id: string) {
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


  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file).then(data => {
      this.form.patchValue({
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

  // deleteImage(img?: string): void {
  //   img = img ? img : this.valueByControl('imagePath')
  //   this.isUploaded = false;
  //   const task = ref(this.storage, img);
  //   deleteObject(task).then(() => {
  //     console.log('File deleted successfully');
  //     this.form.patchValue({
  //       img: null
  //     })
  //   })
  // }

  valueByControl(control: string): string {
    return this.form.get(control)?.value;
  }
}

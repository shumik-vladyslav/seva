import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Firestore, collectionData, collection, addDoc, doc, deleteDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-work-offers',
  templateUrl: './work-offers.component.html',
  styleUrls: ['./work-offers.component.scss']
})
export class WorkOffersComponent implements OnInit {
  public form: FormGroup;

  workOffer$: Observable<any[]>;

  collections: any;

  constructor(private firestore: Firestore) {

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
    console.log(id);


    deleteDoc(doc(this.firestore, `workOffer/${id}`));
  }


  createWorkOffer(){
    if(this.form.valid){
      addDoc(this.collections,  {
        title: this.form.controls["title"].value,
        subTitle: this.form.controls["subTitle"].value,
        desc: this.form.controls["desc"].value,
        isHot: this.form.controls["isHot"].value
      });
    }
  }

  ngOnInit(): void {
  }

}

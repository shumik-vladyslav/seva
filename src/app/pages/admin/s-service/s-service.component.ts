import { Component, OnInit } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
// import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
// import { NoopScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-s-service',
  templateUrl: './s-service.component.html',
  styleUrls: ['./s-service.component.scss']
})
export class SServiceComponent implements OnInit {

  collections: any;
  workOffers$: any;
  workOffer: any;

  constructor(
    // private dialog: MatDialog,
    private firestore: Firestore,
    private activeRoute: ActivatedRoute
  ) {
    activeRoute.params.subscribe((e: any) => {
      const collSup = collection(firestore, 'samayasServices');
      this.workOffers$ = collectionData(collSup, { idField: 'id' });
      this.workOffers$.subscribe((el: any) => {
        this.workOffer = el.find((val : any) => val.id === e.details)
        let descBlock : any = document.querySelector('.work-detail-description')
        descBlock.innerHTML =  this.workOffer?.bigDesc
      })
    })
  }

  ngOnInit(): void {}

  modalDetailsShow() {
    // let data = {
    //   type: 'work',
    //   val: this.workOffer
    // }
    // this.dialog.open(WorkFormComponent, {
    //   height: '45%',
    //   maxWidth: '95%',
    //   scrollStrategy: new NoopScrollStrategy(),
    //   data: data,
    //   panelClass: ["dialog-responsive", "dialog-border", "modal_"]
    // });
  }
}


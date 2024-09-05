import { Component, OnInit } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { WorkFormComponent } from '../work-form/work-form.component';
import { NoopScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-work-details',
  templateUrl: './work-details.component.html',
  styleUrls: ['./work-details.component.scss']
})
export class WorkDetailsComponent implements OnInit {

  collections: any;
  workOffers$: any
  workOffer: any

  constructor(
    private dialog: MatDialog,
    private firestore: Firestore,
    private activeRoute: ActivatedRoute
  ) {
    activeRoute.params.subscribe((e: any) => {
      const collSup = collection(firestore, 'workOffer');
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
    let data = {
      type: 'work',
      val: this.workOffer
    }
    this.dialog.open(WorkFormComponent, {
      height: '45%',
      maxWidth: '95%',
      scrollStrategy: new NoopScrollStrategy(),
      data: data,
      panelClass: ["dialog-responsive", "dialog-border", "modal_"]
    });
  }
}

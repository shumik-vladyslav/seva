import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MatDialog } from '@angular/material/dialog';
import { WorkFormComponent } from '../work-form/work-form.component';
import { NoopScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
  }

  public customOptions2: OwlOptions = {
    loop: true,
    mouseDrag: true,
    items: 1,
    navSpeed: 600,
    navText: [
      "<div><img src='../../../assets/img/Vector9.png'><img src='../../../assets/img/Vector9.png'></div>",
      "<div><img src='../../../assets/img/Vectorr9.png'><img src='../../../assets/img/Vectorr9.png'></div>"
    ],
    dots: false,
    nav: true,
    navClass: ['.first-owl-prev', '.fitst-owl-next']
  } as any;

  public customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    dots: false,
    navSpeed: 400,
    center: true,
    navText: [
      "<div><img src='../../../assets/img/Vectorarrow.png'></div>",
      "<div><img src='../../../assets/img/Vectorr.png'></div>"
    ],
    nav: true,
    responsive: {
      0: {
        items: 1
      },

      870: {
        items: 5
      }
    },

    navClass: ['owl-prev', 'owl-next']
  } as any
  public previousPage = 0;

  quotes$: Observable<any[]>;
  slides$: Observable<any[]>;
  support$: Observable<any[]>;
  content$: Observable<any[]>;

  constructor(
    firestore: Firestore,
    private dialog: MatDialog,
    ) {
    const coll = collection(firestore, 'quotes');
    this.quotes$ = collectionData(coll);
    const collSup = collection(firestore, 'suport');
    this.support$ = collectionData(collSup);
    const collectionsSld = collection(firestore, 'slides');
    this.slides$ = collectionData(collectionsSld, {idField: 'id'});
    const collectionsContent = collection(firestore, 'content');
    this.content$ = collectionData(collectionsContent, {idField: 'id'});
  }

  modalDetail(){
    let data = {
      type: 'donate',
      val: ''
    }
    this.dialog.open(WorkFormComponent, {
      height: '45%',
      maxWidth: '95%',
      data: data,
      scrollStrategy: new NoopScrollStrategy(),
      panelClass: ["dialog-responsive", "dialog-border", "modal_"]
    });
  }
}

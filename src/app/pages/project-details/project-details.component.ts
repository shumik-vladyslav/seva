import { Component, OnInit } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { WorkFormComponent } from '../work-form/work-form.component';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  project$: any;
  project: any;
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
  } as any;
  public previousPage = 0;

  constructor(
    private firestore: Firestore,
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) {
    activeRoute.params.subscribe((e: any) => {
      const collSup = collection(firestore, 'projectContent');
      this.project$ = collectionData(collSup, { idField: 'id' });
      this.project$.subscribe((el: any) => {
        this.project = el.find((val : any) => val.id === e.details)
        let descBlock : any = document.querySelector('.bottom-proj-detail')
        descBlock.innerHTML =  this.project?.bigDesc;
      })
    })
  }

  ngOnInit(): void {
  }

  modalDetail(){
    let data = {
      type: 'donate',
      val: this.project
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  projects$: Observable<any>;
  constructor(firestore: Firestore) {
    const collSup = collection(firestore, 'projectContent');
    this.projects$ = collectionData(collSup, {idField: 'id'}).pipe(
      map((projects: any[]) => {
        return projects.sort((a: any, b: any) => {
          const dateA = a.date ? new Date(a.date).getTime() : -Infinity;
          const dateB = b.date ? new Date(b.date).getTime() : -Infinity;
          return dateB - dateA;
        });
        // return projects.sort((a: any, b: any) => {
        //   const dateA = a.date ? new Date(a.date).getTime() : -Infinity;
        //   const dateB = b.date ? new Date(b.date).getTime() : -Infinity;
        //   return dateA - dateB; // Ascending order
        // });
      })
    );
  }
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'your custom text';

  }
  public customOptions2: OwlOptions = {
    loop: true,
    mouseDrag: true,
    items: 1,
    navSpeed: 600,
    navText: [
      "<div><img src='../../../assets/img/Vector12.png'></div>",
      "<div><img src='../../../assets/img/Vector11.png'></div>"
    ],
    dots: false,
    nav: true,
    navClass: ['.first-owl-prev', '.fitst-owl-next']
  } as any;

}

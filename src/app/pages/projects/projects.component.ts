import { Component, OnInit, ViewChild } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  projects$: Observable<any>;
  public slides = [
    {
      img:'../../../assets/img/GoChicago.ru-3099.png',
      title: 'Строительство храма Вишну в Тримурти ашраме',
      desc: 'Начат проект по строению храма Вишну в стиле индийского мандира, посвященный 12 его аватарам'
    },
    {
      img:'../../../assets/img/GoChicago.ru-3099.png',
      title: '«Влечение к Богу чувствуют не все, а только те, у кого есть сукрити.',
      desc: 'Начат проект по строению храма Вишну в стиле индийского мандира, посвященный 12 его аватарам'
    },
  ];
  constructor(firestore: Firestore) {
    const collSup = collection(firestore, 'projectContent');
    this.projects$ = collectionData(collSup, {idField: 'id'});
  }
  ngOnInit(): void {
    // setTimeout(() => {

    // }, 200);

  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.paginator._intl.itemsPerPageLabel = 'your custom text';

  }
  public customOptions2: OwlOptions = {
    loop: true,
    mouseDrag: true,
    items: 1,
    navSpeed: 600,

    navText: [
      // "<i class='fa fa-caret-left'></i>",

      "<div><img src='../../../assets/img/Vector12.png'></div>",
      "<div><img src='../../../assets/img/Vector11.png'></div>"
    ],
    dots: false,
    nav: true,
    navClass: ['.first-owl-prev', '.fitst-owl-next']
  } as any;

}

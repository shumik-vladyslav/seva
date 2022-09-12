import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public firstSlides = [
    {
      title: '«Влечение к Богу чувствуют не все, а только те, у кого есть сукрити, запас благочестия».',
      name: 'Свами Вишнудевананда Гири'
    },
    {
      title: '«Влечение к Богу чувствуют не все, а только те, у кого есть сукрити.',
      name: 'Свами Вишнудевананда Гири'
    },
  ];

  public slides = [
    {
      imgUrl: '../../../assets/img/__Joga_Vasishtha 1.png',
      id: '0',
      title: 'Фонд по сбору пожертвований на храм Вишну закрыт',
      description: 'Служение выполнили: Яшодеви, Даттадеви, Омкар, Гананатха. Материальное обеспечение проекта: Васудева, Вималакирти.',
      isActive: true
    },
    {
      imgUrl: '../../../assets/img/__Joga_Vasishtha 1 (1).png',
      title: 'В Тримурти ашраме высажено 200 новых деревьев',
      description: 'Служение выполнили: Яшодеви, Даттадеви, Омкар, Гананатха. Материальное обеспечение проекта: Васудева, Вималакирти.',
      id: '1',
      isActive: true
    },
    {
      imgUrl: '../../../assets/img/__Joga_Vasishtha 1 (2).png',
      title: 'Завершен перевод “Йога Васиштхи”',
      description: 'Служение выполнили: Яшодеви, Даттадеви, Омкар, Гананатха. Материальное обеспечение проекта: Васудева, Вималакирти.',
      id: '2',
      isActive: true
    },
    {
      imgUrl: '../../../assets/img/__Joga_Vasishtha 1 (3).png',
      id: '3',
      title: 'Фонд по сбору пожертвований на мурти Даттатрейи закрыт',
      description: 'Служение выполнили: Яшодеви, Даттадеви, Омкар, Гананатха. Материальное обеспечение проекта: Васудева, Вималакирти.',
      isActive: true
    },
    {
      imgUrl: '../../../assets/img/__Joga_Vasishtha 1 (4).png',
      id: '4',
      title: 'Озвучена книга “Антарбхава Видья”',
      description: 'Служение выполнили: Яшодеви, Даттадеви, Омкар, Гананатха. Материальное обеспечение проекта: Васудева, Вималакирти.',
      isActive: true
    },
    {
      imgUrl: '../../../assets/img/__Joga_Vasishtha 1 (4).png',
      id: '4',
      title: 'Озвучена книга “Антарбхава Видья”',
      description: 'Служение выполнили: Яшодеви, Даттадеви, Омкар, Гананатха. Материальное обеспечение проекта: Васудева, Вималакирти.',
      isActive: true
    },
    {
      imgUrl: '../../../assets/img/__Joga_Vasishtha 1 (4).png',
      id: '4',
      title: 'Озвучена книга “Антарбхава Видья”',
      description: 'Служение выполнили: Яшодеви, Даттадеви, Омкар, Гананатха. Материальное обеспечение проекта: Васудева, Вималакирти.',
      isActive: true
    },
    {
      imgUrl: '../../../assets/img/__Joga_Vasishtha 1 (4).png',
      id: '4',
      title: 'Озвучена книга “Антарбхава Видья”',
      description: 'Служение выполнили: Яшодеви, Даттадеви, Омкар, Гананатха. Материальное обеспечение проекта: Васудева, Вималакирти.',
      isActive: true
    },
    {
      imgUrl: '../../../assets/img/__Joga_Vasishtha 1 (4).png',
      id: '4',
      title: 'Озвучена книга “Антарбхава Видья”',
      description: 'Служение выполнили: Яшодеви, Даттадеви, Омкар, Гананатха. Материальное обеспечение проекта: Васудева, Вималакирти.',
      isActive: true
    },
  ]
  public customOptions2: OwlOptions = {
    loop: true,
    mouseDrag: true,
    items: 1,
    navSpeed: 600,
    navText: [
      // "<i class='fa fa-caret-left'></i>",

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
      // "<i class='fa fa-caret-left'></i>",

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
  public previousPage = 0

  activePagBtn(id: any) {
    if (id === 'prev') {
      this.slides[this.previousPage].isActive = false
      if (this.previousPage === 0) this.previousPage = this.slides.length - 1
      else this.previousPage--
      this.slides[this.previousPage].isActive = true
    }
    else if (id === 'next') {
      this.slides[this.previousPage].isActive = false
      if (this.previousPage === this.slides.length - 1) this.previousPage = 0
      else this.previousPage++
      this.slides[this.previousPage].isActive = true
    }
    else {
      this.previousPage = +id
      this.slides.filter(e => {
        e.isActive = false
        if (e.id === id) e.isActive = true
      })
    }
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss']
})
export class WorksComponent implements OnInit {

  constructor() { }

  chackedValue: Array<any> = []
  ngOnInit(): void {
  }

  changeChackbox(event:any){
    if(event.target.checked)this.chackedValue.push(event.target.defaultValue)

    else{
      this.chackedValue.find((e:any,i:any)=>{
        if(e === event.target.defaultValue)this.chackedValue.splice(i, 1)
      })
    }

    console.log(this.chackedValue);
  }
  deleteValue(i: any){
    let value =  this.chackedValue[i]
    let elem = document.forms[0].childNodes
    elem.forEach((e: any) => {if(e.children[0].defaultValue == value)e.children[0].checked = false});
    this.chackedValue.splice(i, 1)
  }
  isShow = false

  showCategory(){
    if(window.innerWidth < 950){
      let title: any = document.querySelector('.arrow-categ')
      let hidenContainer : any = document.querySelector('.checkbox-holder')
      console.log(hidenContainer);
      if( !this.isShow ) {
        this.isShow = true
        hidenContainer.style.display = 'flex'
        title.classList.add('rotate')
      }
      else{
        this.isShow = false
        hidenContainer.style.display = 'none'
        title.classList.remove('rotate')

      }
        console.dir(hidenContainer);
      // hidenContainer.hidden = !hidenContainer.hidden
    }

  }

}

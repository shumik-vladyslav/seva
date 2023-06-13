import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection, addDoc } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss']
})
export class WorksComponent implements OnInit {
  categorys$: Observable<any[]>;
  collections: any;
  chakedValueId?: any=[]
  categorys=[]
  change?: number
  type: any = null;
  workOffer$: Observable<any>;
  chackedValue: Array<any> = [];

  constructor(
    private firestore: Firestore,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    ) {
    const collSup = collection(firestore, 'workOffer');
    this.workOffer$ = collectionData(collSup, {idField: 'id'});
    this.collections = collection(firestore, 'category');
    this.categorys$ = collectionData(this.collections, {idField: 'id'});
  }
  form: any;
  initForm() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      phone: [null, [Validators.required]],
      category: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
    });
  }


  ngOnInit(): void {
    this.initForm()
    this.categorys$.subscribe(e=>{
      this.categorys= JSON.parse(JSON.stringify(e))
    })
  }

  changeChackbox(event:any){
    this.change =  Math.random()
    this.type = 'add'
    if(event.target.checked){
      this.chackedValue.push(event.target.defaultValue)
      this.categorys.filter((e:any)=> {
        if(e.title == event.target.defaultValue)this.chakedValueId.push(e)
      })
    }
    else{
      this.type = 'del'
      this.chackedValue.find((e:any,i:any)=>{
        if(e === event.target.defaultValue)this.chackedValue.splice(i, 1)

      })
      this.chakedValueId.find((e:any,i:any)=>{
        if(e?.title === event.target.defaultValue){
          this.chakedValueId.splice(i, 1)
        }
      })
    }

  }
  deleteValue(i: any){
    this.change =  Math.random()
    this.type = 'del'
    let value =  this.chackedValue[i]
    let elem = document.forms[0].childNodes

    elem.forEach((e: any) => {
      if(e.children){
        if(e.children[0]?.defaultValue == value){
         e.children[0].checked = false;
         this.chackedValue.splice(i, 1)
        }
      }
    })
    this.chakedValueId.find((e:any,i:any)=>{
      if(e.title === value){
        this.chakedValueId.splice(i, 1)
      }
    })
  }
  openSnackBar(message:string){
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      duration: 1000,
    });
  }
  sendMessage() {
    if (this.form.valid) {
      addDoc(collection(this.firestore, 'serviceMessage'), this.form.value).then(()=>{
        this.openSnackBar('Заявка Оставленна')
      }).catch(err=>{
        this.openSnackBar(err)
      })
    }

    else{
      this.openSnackBar('Не верно заполненые данные!')
    }
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

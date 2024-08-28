import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection, addDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { FormApplyComponent } from '../form-apply/form-apply.component';

@Component({
  selector: 'app-samayas-services-form',
  templateUrl: './samayas-services-form.component.html',
  styleUrls: ['./samayas-services-form.component.scss']
})
export class SamayasServicesFormComponent implements OnInit {
  categorys$: Observable<any[]>;
  collections: any;
  chakedValueId?: any = [];
  categorys = [];
  change?: number;
  type: any = null;
  isShow = false;
  workOffer$: Observable<any>;
  chackedValue: Array<any> = [];
  constructor(
    private firestore: Firestore,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { 
    const collSup = collection(firestore, 'samayasServices');
    this.workOffer$ = collectionData(collSup, { idField: 'id' });
    this.collections = collection(firestore, 'samayaCategories');
    this.categorys$ = collectionData(this.collections, { idField: 'id' });
  }

  ngOnInit(): void {
  }

  modalApply() {
    let dialog = this.dialog.open(FormApplyComponent, {
      height: '45%',
      maxWidth: '95%',
      panelClass: ["dialog-responsive", "dialog-border"],
      data: {
        title: 'Если вы хотите предоставить свой навык в помощь другим самайным, оставьте заявку и мы свяжемся с вами.',
       categories: this.categorys$
      }
    });
    dialog.afterClosed().subscribe(e=>{
      if(e){
        this.sendMessage(e);
      }
    })
  }

  sendMessage(form: any) {
    if (form.valid) {
      addDoc(collection(this.firestore, 'serviceMessage'), form.value).then(() => {
        this.openSnackBar('Заявка Оставленна')
      }).catch(err => {
        this.openSnackBar(err)
      })
    } else {
      this.openSnackBar('Не верно заполненые данные!')
    }
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      duration: 1000,
    });
  }

  deleteValue(i: any) {
    this.change = Math.random()
    this.type = 'del'
    let value = this.chackedValue[i]
    let elem = document.forms[0].childNodes

    elem.forEach((e: any) => {
      if (e.children) {
        if (e.children[0]?.defaultValue == value) {
          e.children[0].checked = false;
          this.chackedValue.splice(i, 1)
        }
      }
    })
    this.chakedValueId.find((e: any, i: any) => {
      if (e?.title === value) {
        this.chakedValueId.splice(i, 1)
      }
    })
  }

  showCategory() {
    if (window.innerWidth < 950) {
      let title: any = document.querySelector('.arrow-categ')
      let hidenContainer: any = document.querySelector('.checkbox-holder')
      if (!this.isShow) {
        this.isShow = true
        hidenContainer.style.display = 'flex'
        title.classList.add('rotate')
      }
      else {
        this.isShow = false
        hidenContainer.style.display = 'none'
        title.classList.remove('rotate')

      }
    }
  }

  changeCheckbox(event: any) {
    this.change = Math.random()
    this.type = 'add'
    if (event.target.checked) {
      this.chackedValue.push(event.target.defaultValue)
      this.categorys.filter((e: any) => {
        if (e.title == event.target.defaultValue) this.chakedValueId.push(e)
      })
    }
    else {
      this.type = 'del'
      this.chackedValue.find((e: any, i: any) => {
        if (e === event.target.defaultValue) this.chackedValue.splice(i, 1)

      })
      this.chakedValueId.find((e: any, i: any) => {
        if (e?.title === event.target.defaultValue) {
          this.chakedValueId.splice(i, 1)
        }
      })
    }
  }
}

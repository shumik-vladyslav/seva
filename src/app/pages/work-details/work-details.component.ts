import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WorkFormComponent } from '../work-form/work-form.component';

@Component({
  selector: 'app-work-details',
  templateUrl: './work-details.component.html',
  styleUrls: ['./work-details.component.scss']
})
export class WorkDetailsComponent implements OnInit {

  constructor(
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
  }
  modalDetailsShow(data: any){
    console.log(data);
  // if(data.ActiveToClient || data.SerialName){

    let dialogRef = this.dialog.open(WorkFormComponent, {
      height: '45%',
      // width: '70%',
      maxWidth: '95%',
      data:  data,
      panelClass: "dialog-responsive"

    });
  }
  // else window.open(data.BuyLink)
// }
}

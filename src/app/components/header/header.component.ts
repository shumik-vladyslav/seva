import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WorkFormComponent } from 'src/app/pages/work-form/work-form.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private dialog: MatDialog

  ) { }

  ngOnInit(): void {
  }

  modalDetail(){
    let data = {
      type: 'donate',
      val: ''
    }
    let dialogRef = this.dialog.open(WorkFormComponent, {
      height: '45%',
      maxWidth: '95%',
      data: data,
      panelClass: "dialog-responsive"
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-work-form',
  templateUrl: './work-form.component.html',
  styleUrls: ['./work-form.component.scss']
})
export class WorkFormComponent implements OnInit {

  constructor(
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
  }
  closeModal(){
    this.dialog.closeAll()
  }
  sendMessage(){
    this.closeModal()
  }
}

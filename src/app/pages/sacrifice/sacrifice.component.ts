import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sacrifice',
  templateUrl: './sacrifice.component.html',
  styleUrls: ['./sacrifice.component.scss']
})
export class SacrificeComponent implements OnInit {
  index: number = 0;
  currency: string = 'RUB';
  currencies = [
    'RUB',
    'USD',
    'EUR'
  ]
  constructor() { }

  setCurrent(i: number, currency: string) {
    this.index = i; 
    this.currency = currency;
  }

  ngOnInit(): void {

  }
}

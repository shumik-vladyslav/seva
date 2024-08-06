import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sacrifice',
  templateUrl: './sacrifice.component.html',
  styleUrls: ['./sacrifice.component.scss']
})
export class SacrificeComponent implements OnInit {
  formAmount!: FormGroup;
  md5_hmac: any;
  index: number = 0;
  activeTab = {};
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.formAmount = new FormGroup({
      amount: new FormControl(1, Validators.required)
    });
  }

  submitForm() {
    console.log(this.formAmount);
    this.sendGetRequest();
  }

  getId(params: any) {
    const url = 'https://wiki.wayforpay.com/wiki/default/generate-hmac';
    return this.http.get(url, { params });
  }

  sendGetRequest() {
    // let order = Math.random().toString(36).substring(2, 15) +
    //   Math.random().toString(36).substring(2, 15);
    // let string = `yogisforpeace_life;https://yogisforpeace.life/payment;${order};14153798632;${this.formAmount.get('amount').value};${this.formAmount.get('currency').value};Намасте;1;1000`

    // this.md5_hmac = JHash.hex_hmac_md5("b4444121b00943e695a963a69b8c7732869f7b6a", string);
    // console.log(this.md5_hmac);

    // var wayforpay = new Wayforpay();
    // wayforpay.run({
    //   merchantAccount: "yogisforpeace_life",
    //   merchantDomainName: "https://yogisforpeace.life/payment",
    //   authorizationType: "SimpleSignature",
    //   merchantSignature: this.md5_hmac,
    //   orderReference: order,
    //   orderDate: "14153798632",
    //   amount: this.formAmount.get('amount').value,
    //   currency: this.formAmount.get('currency').value,
    //   productName: "Намасте",
    //   productPrice: "1000",
    //   productCount: "1",
    //   // clientFirstName : "Вася", 		
    //   // 		clientLastName : "Васечкин", 			
    //   //     	clientEmail : "some@mail.com", 			
    //   //       	clientPhone: "380631234567", 			
    //   //         	language: "UA" 		
    // },
    //   function (response) {// on approved				 	
    //   }, function (response) {// on declined 
    //   }, function (response) {// on pending or in processing 	
    //   })
  }

  goToUrl(url: string) {
    window.open(url);
  }
}

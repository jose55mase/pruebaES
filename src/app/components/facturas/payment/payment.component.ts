import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  article= {
    description :"",
    amount: "",
    idUser: "",
    price: "" ,
    idProduct: "",
    image : "",
    date:"",
    user:""
  }

  constructor(
    private _router : Router,
  ) {
    if(sessionStorage.getItem("payMent")){
      this.article = JSON.parse(sessionStorage.getItem("payMent"))
      console.log(this.article)
    }
  }

  ngOnInit(): void {
  }

  exit(){
    this._router.navigate(["/article"])
  }

}

import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/app/service/billService/bill.service';
import { UserService } from 'src/app/service/userService/user.service';
import { ProductService } from 'src/app/service/productService/product.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css'],
  providers:[BillService,UserService,ProductService]
})
export class FacturasComponent implements OnInit {

  listBill : any[] = [];
  litUser : any[] = [];
  listProduct : any[] = [];


  constructor(
    private _billService : BillService,
    private _userService : UserService,
    private _productService : ProductService,
  ) {

    this._billService.list().subscribe(
      (res)=>{
        this.listBill = res},
      (error)=>{alert("Error al cargar la lista")}
      )
    this._productService.list().subscribe(
      (res)=>{
        this.listProduct = res},
      (error)=>{alert("Error al cargar la lista")}
      )
    this._userService.list().subscribe(
      (res)=>{
        this.litUser = res       
        this.listBill.map((bill)=>{          
          this.litUser.map((user)=>{
            if(bill.idUser == user.code){              
              bill["user"] = user.name
            }
          })
          this.listProduct.map((product)=>{
            if(bill.idProduct == product.code){              
              bill["product"] = product.name
              bill["image"] = product.image
            }
          })
        })
      },
      (error)=>{alert("Error al cargar la lista")}
      )
    
    
  }

  ngOnInit(): void {
  }

  showProduct(json){    
    var filter = this.listBill.find((data)=>{return data.code == json.code})    
    sessionStorage.setItem("payMent",JSON.stringify(filter))
  }    
}

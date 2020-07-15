import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from 'src/app/service/productService/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/userService/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers:[ProductService, UserService]
})
export class ProductsComponent implements OnInit {

  public dataClient = new Object;
  showClient = false;
  editClient = false;
  createClient = false;
  object = new Object;

  constructor(
    private _productService : ProductService,
    private activatedRoute : ActivatedRoute,
    private _router : Router,
    private _userService : UserService,
  ) 
  {
    this.activatedRoute.queryParams.subscribe((param)=>{
      this.dataClient = param;
      this.onReload(this.dataClient);
    })
  }

  onReload(data){
    switch (data.show) {
      case "show":
          this.showClient = true;
          this.showData(data)
        break;
      case "edit":
          this.editClient = true;
          this.showData(data)
        break;
      case "create":
          this.createClient = true;
          this.showData(data)
        break;
          
      default:
        break;
    }
  }
  
  ngOnInit(): void { }

  formBulder = new FormGroup({
    employeeName : new FormControl('',[Validators.required]),
    employeeAge : new FormControl('',[Validators.required]),
    employeeSalary : new FormControl('',[Validators.required]),    
    profileImage : new FormControl('',[]),
  })

  showData(data){
    this.formBulder.controls["employeeName"].setValue(data.employeeName)
    this.formBulder.controls["employeeAge"].setValue(data.employeeAge)
    this.formBulder.controls["employeeSalary"].setValue(data.employeeSalary)
    this.formBulder.controls["profileImage"].setValue(data.profileImage)
  }

  updateState(){
    this.showClient = false;
    this.editClient = true;
  }
  
  deleteData(){
    
    this.object={
      id: parseInt(this.dataClient["id"]),
    }
    console.log(this.object)
    
    this._userService.delete(this.object).subscribe(
      (respose)=>{alert("Eliminado"),this._router.navigate(["/"])},
      (error)=>{alert("Error al guardar")}  
      )
  }

  cancel(){
    this._router.navigate(["/"])
  }

  update(){
    this.object={
      id: parseInt(this.dataClient["id"]),
      employeeName: this.formBulder.value.employeeName,
      employeeAge: parseInt(this.formBulder.value.employeeAge),
      employeeSalary: this.formBulder.value.employeeSalary,
      profileImage: this.formBulder.value.profileImage,
    }
    this._userService.update(this.object).subscribe(
      (respose)=>{
        alert("Actualizado")
        this._router.navigate(["/"])
      },
      (error)=>{
        (error)=>{alert("Error al editar")}
      }
      )      
  }
  save(){
    this.object={
      employeeName: this.formBulder.value.employeeName,
      employeeAge: parseInt(this.formBulder.value.employeeAge),
      employeeSalary: this.formBulder.value.employeeSalary,
      profileImage: this.formBulder.value.profileImage,
    }
    
    this._userService.save(this.object).subscribe(
      (respose)=>{alert("Guardado"),this._router.navigate(["/"])},
      (error)=>{alert("Error al guardar")}  
      )
  }

 

  /*======== Old */

  color = "success";
  
  listProduct : any[] = [];
  public idProduct:number;
  btn_saveUpdata = false;


  

  

  

  

  updateForm(data) {
    this.btn_saveUpdata = true;
    this.idProduct = data.code
    this.formBulder.controls["name"].setValue(data.name)
    this.formBulder.controls["description"].setValue(data.description)
    this.formBulder.controls["amount"].setValue(data.amount)
    this.formBulder.controls["price"].setValue(data.price)
    this.formBulder.controls["image"].setValue(data.image)
  }
  updateCancel(){
    this.btn_saveUpdata = false;
    this.formBulder.reset();
  }

  
}


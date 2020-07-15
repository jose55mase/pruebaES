import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/service/productService/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap, NavigationExtras } from '@angular/router';
import { BillService } from 'src/app/service/billService/bill.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { UserService } from 'src/app/service/userService/user.service';
import { identifierModuleUrl } from '@angular/compiler';
import {MatSort} from '@angular/material/sort';

export interface PeriodicElement {
  employeeAge: number;
  employeeName: string;
  employeeSalary: string;
  id: number;
  profileImage: string;
}


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [ProductService,BillService,UserService]
})
export class ArticleComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public dataSource =  new MatTableDataSource;
  salary : number = 0;
  age : number = 0;
  ageLarge : number = 0;
  employeerId : number = 0;

  constructor(
    private _router : Router,
    private _userService : UserService
  )
  {
    this._userService.list().subscribe(
      (data)=>{

        var ageEmployee = 0;
        var salaryEmployee = 0;
        data.map((salary)=>{
          var value = parseInt(salary.employeeSalary)
          var age =  parseInt(salary.employeeAge)
          if(age > this.ageLarge){this.ageLarge = age}
          ageEmployee = age + ageEmployee
          salaryEmployee = value + this.salary
        })

        this.dataSource = new MatTableDataSource<PeriodicElement>(data);
        this.dataSource.paginator = this.paginator;

        this.dataSource.filteredData.map((data)=>{
          if(data["employeeSalary"] > 3000){
            data["color"]="green"
          }
          if(3000 >= data["employeeSalary"] ||  1000 >= data["employeeSalary"]){
            data["color"]="blue"
          }
          if(1000 > data["employeeSalary"]){
            data["color"]="red"
          }
        })
        
        this.dataSource.sort = this.sort
        this.age = Math.round(ageEmployee/data.length)
        this.salary = Math.round(salaryEmployee/data.length)
        
      }
    )
    
  }
  ngOnInit() {
    
  }

  cloneData(data){
  
    var object={
      "employeeAge": data.employeeAge,
      "employeeName": data.employeeName,
      "employeeSalary": data.employeeSalary,
      "profileImage": data.profileImage
    }
  
    this._userService.save(object).subscribe(
      (respose)=>{alert("Duplicado"),this._router.navigate(["/"])},
      (error)=>{alert("Error al duplicar  ")}  
      )
  }
  delete(data){
    this.employeerId = data.id
  }

  deleteData(){
    var object={"id":this.employeerId}
    this._userService.delete(object).subscribe(
      (respose)=>{alert("Eliminado"),this._router.navigate(["/"])},
      (error)=>{alert("Error al Eliminar")}  
      )
  }


//========================= BTN Show data employer
  showData(data){
    let dataNavigation : NavigationExtras = {
      queryParams:{
        "show": "show",
        "employeeAge": data.employeeAge,
        "employeeName": data.employeeName,
        "employeeSalary": data.employeeSalary,
        "id": data.id,
        "profileImage": data.profileImage
      }
    }
    this._router.navigate(["/products"],dataNavigation)
  }

  //========================= BTN Edit data client
  editData(data){
    let dataNavigation : NavigationExtras = {
      queryParams:{
        "show": "edit",
        "employeeAge": data.employeeAge,
        "employeeName": data.employeeName,
        "employeeSalary": data.employeeSalary,
        "id": data.id,
        "profileImage": data.profileImage
      }
    }
    this._router.navigate(["/products"],dataNavigation)
  }

  //========================= BTN Create data client
  createData(){
    let dataNavigation : NavigationExtras = {
      queryParams:{
        "show": "create",
      }
    }
    this._router.navigate(["/products"],dataNavigation)
  }

  //========================= BTN Create data client
 
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','Accion'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
 
}


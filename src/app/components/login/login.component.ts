import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/userService/user.service';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  user = {
    user : "",
    password : ""
  }
  litUser : any[] = [];
  constructor(
    private _userService:UserService,
    private _router : Router
  ) {
    this._userService.list().subscribe(
      (data)=>{this.litUser = data},
      (error)=>{alert("Error al cargar Usuarios")}
    )

   }

  ngOnInit(): void {
    
  }

  getIn(){
    var filter = this.litUser.find((data)=>{return data.user == this.user.user})
    filter = this.litUser.find((data)=>{return data.password == this.user.password})
    if(filter != undefined){
      sessionStorage.setItem("userNow",JSON.stringify(filter))
      alert("Sesion Iniciada")
      this._router.navigate(["/article"])
    }else{
      alert("Usuario no existe")
    }
  }
}

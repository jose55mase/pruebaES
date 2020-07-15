import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/service/userService/user.service';
import { RolService } from 'src/app/service/rolService/rol.service';


export interface Rol{
  code:number;
  name:String;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService,RolService],
})
export class UsersComponent implements OnInit {

  litRol:Rol[] = [];
  litUser : any[] = [];
  objet = new Object;
  /*
  document: ""
  name: ""
  occupation: ""
  phone: ""
  rolid: ""
  state:true,
  sale:0
  */
  formBulder = new FormGroup({
    name : new FormControl(''),
    document : new FormControl(''),
    phone : new FormControl(''),
    occupation : new FormControl(''),
    rolid : new FormControl(''),
  })

  
  constructor(
    private _userService:UserService,
    private _rolService:RolService
  ) { 
    this._rolService.list().subscribe(
      (data)=>{this.litRol = data},
      (error)=>{alert("Error al cargar ROles")}
    )
    this._userService.list().subscribe(
      (data)=>{this.litUser = data
        this.litUser.map((user)=>{
          this.litRol.map((rol)=>{
            
            if(user.rolid == rol.code){
              user["rolid"] = rol.name
            }
          })
        })
      },
      (error)=>{alert("Error al cargar Usuarios")}
    )

    
    
  }

  ngOnInit(): void {
   
    

  }

  

  save(){
    
    this.objet={
      document: this.formBulder.value.document,
      name: this.formBulder.value.name,
      occupation: this.formBulder.value.occupation,
      phone: this.formBulder.value.phone,
      rolid: this.formBulder.value.rolid,
      state:true,
      sale:0
    }
    
    this._userService.save(this.objet).subscribe(
        (response)=>{
          alert("Guardado")
          this.formBulder.reset;
          this.litUser.push(this.objet)
        },
        (error)=>{alert("error")},
      )
  }

}

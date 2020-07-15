import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  login = false;
  URL = "/Empleado/"
  admin = false;
  user = false;

  


  constructor() {
    
  }


  ngOnInit(): void {
    this.login = false;

    var status = new Observable((observer)=>{
        setInterval(function(){
          observer.next(JSON.parse(sessionStorage.getItem("userNow")))
        },1000)
      }
    )
    
    status.subscribe((res)=>{
        if(res){
          this.login = true;
          if(res["rolid"] == 1){
            this.admin = true;
          }
          if(res["rolid"] == 2){
            this.user = true;
          }
        }else{
          this.login = false;
          this.admin = false;
          this.user = false;
        }
      }
    )

    
  }

  siteOut(){
    sessionStorage.removeItem("userNow")
    this.login = false;
  }

}

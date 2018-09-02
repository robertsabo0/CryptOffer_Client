import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string;
  password:string;
  constructor(
    private route:ActivatedRoute,
    private auth:AuthService,
    private router : Router
    ) { }

  message:string;

  ngOnInit() {
    let err = this.route.snapshot.paramMap.get('err');
    console.log(err);

    if(err == 'out')
      this.logout();

    if(err == '401')
      this.message = 'Bad credentaials';
      if(err == '403')
      this.message = 'Forbidden';
  }

  login():void{
    console.log("login");
    this.auth.checkUserAndPass(this.username, this.password).subscribe(
      (data:any) =>{
        console.log('succesfull login: '+data);
        console.log("username "+this.username);
        console.log('');
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('username', this.username);
        this.router.navigate(['dashboard']);
      },
      (err: any)=>{
        console.log("error "+err);
        var stat = err.status;
        this.router.navigate(['login/'+stat]);
      }
      );
  }

  logout():void{
    console.log("logout");
    this.auth.logout();
  }

}

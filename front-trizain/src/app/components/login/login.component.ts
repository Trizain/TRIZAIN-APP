import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public user:User;
  public token:string;

  constructor(
    private _userService:UserService
  ) {
    this.user = new User('','','','','','','','','','');
    this.token = '';
  }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    this._userService.login(this.user).subscribe(
      response=>{
        if(response.user){
          localStorage.setItem('identified',JSON.stringify(response.user));
          this._userService.login(this.user,true).subscribe(
            response => {
              localStorage.setItem('token',response.token);
            },
            error => {
              console.log(<any>error);
            }
          );
        }
      },
      error=>{
        console.log(<any>error);
      }
    );
  }
}

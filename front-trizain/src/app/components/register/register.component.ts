import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[UserService]
})
export class RegisterComponent implements OnInit {
  public user:User;

  constructor(
    private _userService:UserService,
    private _router:Router
  ){
    this.user = new User('','','','','','','','','','');
  }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    this._userService.register(this.user).subscribe(
      response =>{
        this._router.navigate(['login']);
        form.reset();
      },
      erro =>{
        console.log(<any>erro);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
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
    private _userService:UserService
  ){
    this.user = new User('','','','','','','','','','');
  }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    this._userService.register(this.user).subscribe(
      response =>{
        console.log(response);
        form.reset();
      },
      erro =>{
        console.log(<any>erro);
      }
    );
  }
}

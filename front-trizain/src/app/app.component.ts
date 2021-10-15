import { Component, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements DoCheck {
  title = 'front-trizain';
  public token:string;
  public user_identified:any;

  constructor(
    private _userService:UserService
  ) {
    this.user_identified = this._userService.getUser();
    this.token = this._userService.getToken();
  }
  ngDoCheck(){
    this.user_identified = this._userService.getUser();
    this.token = this._userService.getToken();
  }
}

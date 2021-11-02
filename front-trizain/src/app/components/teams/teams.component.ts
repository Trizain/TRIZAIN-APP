import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/models/team';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
  providers: [UserService,TeamService]
})
export class TeamsComponent implements OnInit {
  public user_identified:any;
  public token:string;
  public team:Team;
  public teams:Array<Team>;

  constructor(
    private _teamService:TeamService,
    private _userService:UserService,
    private _router:Router,
    private _route:ActivatedRoute
  ) {
    this.user_identified = this._userService.getUser();
    this.token = this._userService.getToken();
    this.team = new Team('','','','','');
    this.teams = [];
  }

  ngOnInit(): void {
    sessionStorage.clear();
    this.getTeams();
  }
  getTeams(){
    this._teamService.teams(this.token).subscribe(
      response => {
        this.teams = response.teams;
      },
      erro => {
        console.log(<any>erro);
      }
    );
  }
  onSubmit(form:any){
    this._teamService.create(this.team,this.token).subscribe(
      response => {
        if(response.status == 'success'){
          this.getTeams();
          form.reset();
        }
      }
    );
  }
  teamClick(team_id:string){
    sessionStorage.setItem('team',team_id);
    this._router.navigate(['/panel']);
  }
}

import { Component, DoCheck, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TeamService } from 'src/app/services/team.service';
import { MemberService } from 'src/app/services/member.service';
import { ProjectService } from 'src/app/services/project.service';
import { AreaService } from 'src/app/services/area.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Invitation } from 'src/app/models/invitation';
import { InvitationService } from 'src/app/services/invitation.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
  providers: [
    UserService,
    TeamService,
    MemberService,
    ProjectService,
    AreaService,
    InvitationService
  ]
})
export class NewUserComponent implements OnInit {
  public users: any;
  public teams: Array<any>;
  public projects: any;
  public invitation: Invitation;
  public check_email: any;
  public status:boolean;
  public token: string;
  public member_token: string;
  public userdropdown = {};
  public teamdropdown = {};
  public projectdropdown = {};


  constructor(
    private _userService: UserService,
    private _teamService: TeamService,
    private _memberService: MemberService,
    private _projectService: ProjectService,
    private _areaService: AreaService,
    private _invitationService:InvitationService
  ) {
    this.invitation = new Invitation('', '', '', '', [], 0, '', 0);
    this.check_email = false;
    this.status = false;
    this.userdropdown = {
      singleSelection: true,
      idField: '_id',
      textField: 'username',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.teamdropdown = {
      singleSelection: true,
      idField: '_id',
      textField: 'name',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.projectdropdown = {
      singleSelection: false,
      idField: '_id',
      textField: 'name',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.token = this._userService.getToken();
    this.member_token = this._memberService.getToken();
    this.teams = [];
  }

  ngOnInit(): void {
    this.getTeams();
    this.getUsers();
    this.getProjects(sessionStorage.getItem('team'));
  }
  getUsers() {
    this._userService.getAll(this.token).subscribe(
      response => {
        if (response.status == 'success') {
          this.users = response.users;
          console.log(this.users);
        }
      },
      erro => {
        console.log(<any>erro);
      }
    );
  }
  getTeams() {
    this._teamService.teams(this.token).subscribe(
      response => {
        this.teams = response.teams;
      },
      erro => {
        console.log(<any>erro);
      }
    );
  }
  getProjects(team_id: any) {
    this._projectService.projects(team_id, this.token, this.member_token).subscribe(
      response => {
        this.projects = response.projects;
      },
      erro => {
        console.log(<any>erro);
      }
    );
  }
  checkEmail() {
    if (this.check_email) {
      this.check_email = false;
    } else {
      this.check_email = true;
    }
  }
  createInvitation(form:any){
    this._invitationService.create(this.invitation,this.token,this.member_token).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = true;
        }
      },
      erro => {
        console.log(<any>erro);
      }
    );
  }
  // Item select functions
  userSelect(item:any){
    this.invitation.user = item._id
  }
  teamSelect(item: any) {
    this.getProjects(item._id);
    this.invitation.team = item._id;
  }
  projectsSelect(item: any) {
    this.invitation.projects.push(item);
    console.log(this.invitation);
  }
  projectsDeSelect(item: any) {
    let index = this.invitation.projects.indexOf(item);

    this.invitation.projects.splice(index, 1);
  }
}

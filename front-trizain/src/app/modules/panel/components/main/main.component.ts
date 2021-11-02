import { Component, OnInit,ElementRef, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { MemberService } from 'src/app/services/member.service';
import { AreaService } from 'src/app/services/area.service';
import { Area } from 'src/app/models/area';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [
    ProjectService,
    UserService,
    MemberService,
    AreaService
  ]
})
export class MainComponent implements OnInit, DoCheck {
  public token:string;
  public member_token:any;
  public user_identified:any;
  private team_id:any;
  public project:Project;
  public area:Area;
  public area_selected:any;
  public areas:Array<Area>;
  public projects:Array<Project>;
  public project_selected:string;

  constructor(
    private _projectService:ProjectService,
    private _userService:UserService,
    private _memberService:MemberService,
    private _areaService:AreaService,
    private _router:Router,
    private _route:ActivatedRoute,
    private el:ElementRef
  ) {
    this.token = this._userService.getToken();
    this.user_identified = this._userService.getUser();
    this.member_token = '';
    this.team_id = '';
    this.project_selected = '';
    this.area = new Area('','','','',[]);
    this.project = new Project('','','','');
    this.areas = [];
    this.projects = [];
    this.area_selected = '';
  }

  ngOnInit(): void {
    this.team_id = sessionStorage.getItem('team');
    this.getMember(this.team_id);
    //
  }
  ngDoCheck(){
    this.area_selected = sessionStorage.getItem('area');
  }

  getMember(team_id:any){
    this._memberService.myMember(team_id,this.token).subscribe(
      response => {
        if(response.token){
          sessionStorage.setItem('member',response.token);
          this.member_token = this._memberService.getToken();
          this.getProjects(team_id,response.token);
        }
      },
      erro => {
        console.log(<any>erro);
      }
    );
  }
  getProjects(team_id:string,member_token:string){
    this._projectService.projects(team_id,this.token,member_token).subscribe(
      response => {
        if(response.status == 'success'){
          this.projects = response.projects;
          console.log(this.projects);
        }
      },
      erro => {
        console.log(<any>erro);
      }
    );
  }
  createProject(form:any){
    this._projectService.create(this.project,this.team_id,this.token,this.member_token).subscribe(
      response => {
        console.log(response);
        this.getProjects(this.team_id,this.member_token);
      },
      erro => {
        console.log(<any>erro);
      }
    );
  }
  getAreas(project_id:string){
    this.project_selected = project_id;
    sessionStorage.setItem('project',project_id);
    sessionStorage.removeItem('area');
    // Add class active to project selected and remove session area
    let element = document.getElementById(this.project_selected);
    let all = document.querySelectorAll('a');
    all.forEach(element=>{
      element.classList.remove('active');
    });
    element?.classList.add('active');
    sessionStorage.removeItem('area');

    this._areaService.getAreas(project_id,this.token,this.member_token).subscribe(
      response => {
        if(response){
          this.areas = response.areas;
          console.log(this.project_selected);
        }
      },
      erro => {
        console.log(<any>erro);
      }
    );
  }
  createArea(form:any){
    this._areaService.create(this.area,this.project_selected,this.token,this.member_token).subscribe(
      response => {
        if(response){
          this.getAreas(this.project_selected);
        }  
      },
      erro => {
        console.log(<any>erro);
      }
    );
  }
  selectArea(area_id:string){
    let element = document.getElementById(area_id);
    let all = Array.from(document.getElementsByClassName('area'));
    
    all.forEach(element=>{
      element.classList.remove('active');
    });
    element?.classList.add('active');
    this._areaService.getArea(area_id,this.token,this.member_token).subscribe(
      response => {
        if(response.status == 'success'){
          this.area = response.area;
          sessionStorage.setItem('area',this.area._id);
        }
      },
      erro => {
        console.log(<any>erro);
      }
    );
  }

}

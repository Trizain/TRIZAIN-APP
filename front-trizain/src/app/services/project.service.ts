import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';
import { Observable } from 'rxjs';
import { Project } from '../models/project';

@Injectable()
export class ProjectService{
    public url:string;
    public project:Project;
    public token:string;

    constructor(
        private _http:HttpClient
    ){
        this.url = global.url + 'project/';
        this.token = '';
        this.project = new Project('','','','');
    }

    projects(team_id:string,token:string,member_token:string):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token)
                                                                              .set('member_token',member_token);
        return this._http.get(this.url + 'team/'+team_id,{headers:headers});
    }
    create(project:Project,team_id:string,token:string,member_token:string){
        let params = JSON.stringify(project);
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token)
                                                                              .set('member_token',member_token);
        return this._http.post(this.url + 'save/' + team_id,params,{headers:headers});                                                                      
    }
}
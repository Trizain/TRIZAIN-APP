import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';
import { Observable } from 'rxjs';
import { Team } from '../models/team';

@Injectable()
export class TeamService{
    public url:string;
    public team:Team;
    public token:string;
    public id:any;

    constructor(
        private _http:HttpClient
    ){
        this.url = global.url + 'team/';
        this.token = '';
        this.team = new Team('','','','','');
    }

    create(team:Team,token:string): Observable<any>{
        let params = JSON.stringify(team);
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token);

        return this._http.post(this.url + 'save',params,{headers:headers});
    }
    teams(token:string): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token);

        return this._http.get(this.url + 'all/teams',{headers:headers});
    }
    getId(){
        let id = sessionStorage.getItem('team');

        if(id != null && id != 'undefined'){
            this.id = id;
        }else{
            this.id = null;
        }

        return this.id;
    }
}
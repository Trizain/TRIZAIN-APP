import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';
import { Observable } from 'rxjs';
import { Member } from '../models/member';

@Injectable()
export class MemberService{
    public url:string;
    public member:Member;
    public token:any;

    constructor(
        private _http:HttpClient
    ){
        this.url = global.url + 'member/';
        this.token = '';
        this.member = new Member('','','','');
    }

    myMember(team_id:any,token:string): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token);

        return this._http.get(this.url + '/i/'+team_id,{headers:headers});
    }
    getToken(){
        let token = sessionStorage.getItem('member');

        if(token != null && token != 'undefined'){
            this.token = token;
        }else{
            this.token = null;
        }

        return this.token;
    }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';
import { Observable } from 'rxjs';
import { Invitation } from '../models/invitation';

@Injectable()
export class InvitationService{
    public url:string;
    public invitation:Invitation;
    public token:string;

    constructor(
        private _http:HttpClient
    ){
        this.url = global.url + 'invitation/';
        this.token = '';
        this.invitation = new Invitation('','','','',[],0,'',0);
    }

    create(invitation:Invitation,token:string,member_token:string): Observable<any>{
        let params = JSON.stringify(invitation);
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token)
                                                                              .set('member_token',member_token);
        return this._http.post(this.url + 'save',params,{headers:headers});                                                                      
    }
}
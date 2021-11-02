import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable()
export class UserService{
    public url:string;
    public user:any;
    public token:any;

    constructor(
        private _http:HttpClient
    ){
        this.url = global.url + 'user/';
    }

    register(user:User): Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        

        return this._http.post(this.url + 'save',params,{headers:headers});
    }
    login(user:User,token = false): Observable<any>{
        if(token){
            user.getToken = 'GET_TOKEN';
        }
        console.log(user);
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.post(this.url + 'login',params,{headers:headers});
    }
    getUser(){
        let user_string:any = localStorage.getItem('identified');
        let user = JSON.parse(user_string);

        if(user != null && user != 'undefined'){
            this.user = user;
        }else{
            this.user = null;
        }

        return this.user;
    }
    getAll(token:string):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token);
        return this._http.get(this.url + 'all/',{headers:headers});
    }
    getToken(){
        let token = localStorage.getItem('token');

        if(token != null && token != 'undefined'){
            this.token = token;
        }else{
            this.token = null;
        }

        return this.token;
    }
}
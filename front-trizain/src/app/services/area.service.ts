import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';
import { Observable } from 'rxjs';
import { Area } from '../models/area';

@Injectable()
export class AreaService{
    public url:string;
    public area:Area;
    public token:string;

    constructor(
        private _http:HttpClient
    ){
        this.url = global.url + 'area/';
        this.token = '';
        this.area = new Area('','','','',[]);
    }

    create(area:Area,project_id:string,token:string,member_token:string):Observable<any>{
        let params = JSON.stringify(area);
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token)
        .set('member_token',member_token);

        return this._http.post(this.url + 'save/'+project_id,params,{headers:headers});
    }
    getArea(area_id:any,token:string,member_token:string):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token)
        .set('member_token',member_token);

        return this._http.get(this.url + area_id,{headers:headers});
    }
    getAreas(project_id:string,token:string,member_token:string):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token)
        .set('member_token',member_token);

        return this._http.get(this.url + 'project/'+project_id,{headers:headers});
    }

}
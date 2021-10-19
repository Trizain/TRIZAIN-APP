import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';
import { Observable } from 'rxjs';
import { File } from '../models/file';

@Injectable()
export class FileService{
    public url:string;
    public file:File;
    public token:string;

    constructor(
        private _http:HttpClient
    ){
        this.url = global.url + 'file/';
        this.token = '';
        this.file = new File('','','',0,0,'','',[]);
    }

    upload(file:File,project_id:string,token:string,member_token:string): Observable<any>{
        let params = JSON.stringify(file);
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token)
        .set('member_token',member_token);

        return this._http.post(this.url + 'save/'+project_id,params,{headers:headers});
    }
    download(file_id:string,token:string,member_token:string){
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token)
        .set('member_token',member_token);

        return this._http.get(this.url + 'download/'+file_id,{headers:headers,responseType: 'blob'});
    }



}
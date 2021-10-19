import { Component, DoCheck, OnInit } from '@angular/core';
import { AreaService } from 'src/app/services/area.service';
import { UserService } from 'src/app/services/user.service';
import { MemberService } from 'src/app/services/member.service';
import { FileService } from 'src/app/services/file.service';
import { Area } from 'src/app/models/area';
import { global } from '../../../../services/global';
import { ActivatedRoute } from '@angular/router';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css'],
  providers: [AreaService,UserService,MemberService,FileService]
})
export class FilesComponent implements OnInit{
  public afuConfig: any;
  public resetVar:boolean;
  public area:Area;
  public token:string;
  public url:string;
  public member_token:string;

  constructor(
    private _areaService:AreaService,
    private _userService:UserService,
    private _memberService:MemberService,
    private _fileService:FileService,
    private _route:ActivatedRoute
  ) {
    this.area = new Area('','','','',[]);
    this.token = this._userService.getToken();
    this.member_token = this._memberService.getToken();
    this.url = global.url;
    this.resetVar = false;
  }

  ngOnInit(): void {
    console.log(this.member_token);
    this.getArea();
  }
  docUpload(event: any) {
    console.log(event);
    this.getArea();
  }
  fileSelected(event: any) {
    console.log(event);
  }
  getArea(){
    this._route.params.subscribe(params => {
      let area_id = params.id;
      
      this._areaService.getArea(area_id,this.token,this.member_token).subscribe(
        response => {
          this.area = response.area;
          this.afuConfig = {
            multiple: false,
            formatsAllowed: ".jpg,.png",
            maxSize: "30",
            uploadAPI: {
              url: this.url + 'file/upload/'+this.area._id,
              method: "POST",
              headers: {
                "Authorization": this.token,
                "member_token":this.member_token
              },
            },
            theme:'attachPin',
            hideProgressBar: false,
            hideResetBtn: true,
            hideSelectBtn: false,
            fileNameIndex: true,
            autoUpload: false,
            replaceTexts: {
              selectFileBtn: 'Select Files',
              resetBtn: 'Reset',
              uploadBtn: 'Upload',
              dragNDropBox: 'Drag N Drop',
              attachPinBtn: 'Upload File',
              afterUploadMsg_success: 'Successfully Uploaded !',
              afterUploadMsg_error: 'Upload Failed !',
              sizeLimit: 'Size Limit'
            }
          };
        },
        erro => {
          console.log(<any>erro);
        }
      );
    });
    
  }
  download(file_id:string,filename:string){
    this._fileService.download(file_id,this.token,this.member_token).subscribe(
      (response:any) => {
        let type_split = response.type.split('/');
        let type = type_split[1];

        console.log(type_split);
        let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
        const url= window.URL.createObjectURL(blob);
        fileSaver.saveAs(blob,filename+'.'+type);
      },
      (erro:any) => {
        console.log(<any>erro);
      }
    );
  }
}

export class File{
   constructor(
       public project:string,
       public member:string,
       public name:string,
       public version:number,
       public size:number,
       public date:string,
       public tags:string,
       public comments:Array<any>
   ) {
       
   }

}
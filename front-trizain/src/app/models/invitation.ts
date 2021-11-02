export class Invitation {
    constructor(
        public _id:string,
        public user:string,
        public email:string,
        public team:string,
        public projects:Array<any>,
        public permissions:number,
        public description:string,
        public status:number,
    ){

    }
}
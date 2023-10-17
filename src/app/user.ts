export class User {
    id:number;
    username:string;
    email:string;
    pwd:string;
    role:string[];
    groups:string[];
    profilepic:string;

    constructor(id:number, username:string, email:string, pwd:string, role:string[], groups:string[], profilepic:string){
        this.username = username;
        this.email = email;
        this.pwd = pwd;
        this.id = id;
        this.role = role;
        this.groups = groups;
        this.profilepic = profilepic;
    }  
}

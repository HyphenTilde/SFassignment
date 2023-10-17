export class Group {
    id:number;
    groupname:string;
    groupcreator:string;
    channels:string[];

    constructor(id:number, groupname:string, groupcreator:string, channels:string[]){
        this.id = id;
        this.groupname = groupname;
        this.groupcreator = groupcreator;
        this.channels = channels;
    }  
}
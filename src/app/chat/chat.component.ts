import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messagecontent:string="";
  messages:string[] = [];

  constructor() {}

  ngOnInit(): void {
    
  }

  chat(){
    if(this.messagecontent){
      console.log(this.messagecontent);
    }
  }
  

}

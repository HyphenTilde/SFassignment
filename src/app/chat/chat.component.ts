import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { FormsModule } from '@angular/forms';
import { MessagesService } from '../services/messages.service';
import { ChatMessage } from '../chat-message';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ChannelHistory } from '../channelhistory';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private router: Router, private messageService: MessagesService, private socket: SocketService, private http:HttpClient) {}

  model = new ChatMessage("","");
  messageList: string[] = [];
  url_array: string[] | null = null;
  profilePictureURL: string | null = null;

  sendMessage(): void {
    console.log(this.model.msg);
    this.url_array = this.router.url.split('/');
    console.log(this.url_array);
    this.messageService.sendMessage(this.model.msg,this.obtainUsername()!, (this.url_array[1] + '/' + this.url_array[2]));
    this.messagestore((this.url_array[1] + '/' + this.url_array[2]), (this.obtainUsername()! + ': ' + this.model.msg));
    this.model.msg = "";
  };

  ngOnInit(): void {
    this.url_array = this.router.url.split('/');
    this.messagedisplay((this.url_array[1] + '/' + this.url_array[2]));
    console.log(this.messageList);
    this.messageService.getMessage().subscribe((message:string)=> {
        this.messageList.push(message);
        console.log(message);
        this.url_array = this.router.url.split('/');
        //this.messagestore((this.url_array[1] + '/' + this.url_array[2]), message);
    })
    this.fetchProfilePicture();
  }

  fetchProfilePicture() {
    const username = this.obtainUsername();
    console.log('Username for GET request:', username);
    this.http.get(`http://localhost:3000/api/getprofilepic/${username}`, { responseType: 'blob' }).subscribe(
      (data: Blob) => {
        if (data) {
          const reader = new FileReader();
          reader.onload = () => {
            this.profilePictureURL = reader.result as string;
          };
          reader.readAsDataURL(data);
          console.log(this.profilePictureURL);
        } else {
          console.log('No profile picture.');
        }
      }
    );
  }
  
  submitted = false;

  messagedisplay(channelname:string){
    this.http.post<ChannelHistory>('http://localhost:3000/api/messagedisplay', { channelname:channelname }).subscribe(
      (data:any)=>{
        if(data){
          for(let i = 0; i < data.length ; i++){
            this.messageList.push(data[i]);
          }
        }
      }
    )
  }

  messagestore(channelname:string, message:string){
    this.http.post<ChannelHistory>('http://localhost:3000/api/messagestore', { channelname:channelname, message:message }, httpOptions).subscribe(
        (data:any)=>{

        })
  }

  onSubmit() {
      this.sendMessage();
      this.submitted = true;
  }

  obtainUsername() {
    return sessionStorage.getItem('username');
  }

}

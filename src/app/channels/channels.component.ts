import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../user';
import { Group } from '../group';
import { MessagesService } from '../services/messages.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent {

  groups: string[] | null = null;
  group: string | null = null;
  channel: string[] | null = null;
  channels: string[] | null = null;
  url_array: string[] | null = null;
  groupname: string | null = null;

  constructor(private router: Router, private http:HttpClient, private messageService: MessagesService){}

  ngOnInit(){
    console.log(this.router.url);
    this.url_array = this.router.url.split('/');
    console.log(this.url_array);
    this.getchannels();
    this.groupname = this.url_array[2];
  }
  
  public channelname(channel1:string){
    this.url_array = this.router.url.split('/');
    this.messageService.joinChannel(this.url_array![2] + '/' + channel1);
  }

  public getchannels(){
    console.log('Obtaining channel data');
    this.group = sessionStorage.getItem('groups');
    this.http.post<Group>('http://localhost:3000/api/getchannels', { group: this.group }, httpOptions). subscribe(
      (data:any)=>{
        if(data.channels){
          this.channel = data.channels;
          for( let i = 0 ; i < data.channels.length ; i++ ){
            if(data.channels[i].groupname == this.url_array![2]){
              this.channels = data.channels[i].channels ;
              console.log(this.channels);
            }
          }
          console.log('Channel data obtained', this.channel);
        } else {
          console.log('Failed to obtain channel data');
        }
      }
    );
  }

}

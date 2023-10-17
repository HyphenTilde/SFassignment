import { Component, OnInit } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Group } from '../group';
import { User } from '../user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'
  })
};


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit{
  username: string | null = null;
  groups: string[] | null = null;
  group: string | null = null;
  groupname = '';
  newgroupname = '';
  pusername: string | null = null;
  rusername: string | null = null;
  rgroup: string | null = null;
  channels: string[] | null = null;
  role: string | null = null;
  channelname = '';
  profilepic: string | null = null;
  selectedImage: File | null = null;
  profilePictureURL: string | null = null;
  
  isLoggedIn = true;


  constructor(private router: Router, private http:HttpClient){}

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.group = sessionStorage.getItem('groups');
    this.role = sessionStorage.getItem('role');
    this.getchannels();
    this.fetchProfilePicture();

    console.log('Raw groups data from session storage: ', this.group);

    if(this.group !== null){
      this.groups = this.group.split(',');
      console.log('Parsed groups:', this.groups);
    }

  }

  /*fetchProfilePicture(){
    const username = this.username;
    console.log('Username for GET request:', this.username);
    this.http.get(`http://localhost:3000/api/getprofilepic/${this.username}`).subscribe(
      (data:any)=>{
        if(data.url){
          this.profilePictureURL = data.url;
          console.log(this.profilePictureURL);
        } else {
          console.log('No profile picture.');
        }
      }
    )
  }*/

  fetchProfilePicture() {
    this.username = this.username;
    console.log('Username for GET request:', this.username);
    this.http.get(`http://localhost:3000/api/getprofilepic/${this.username}`, { responseType: 'blob' }).subscribe(
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

  onImageChange(event: any){
    const file = event.target.files[0];
    this.selectedImage = file;
    this.profilepic = file.name;
  }

  public creategroup(){
    console.log("Just tried to create a group.");
    console.log("Put in " + this.groupname + " for the group name.")
    //sessionStorage.setItem('username', this.userName);
    //sessionStorage.setItem('password', this.password);
    console.log('Any random thing honestly.');
    this.http.post<Group>('http://localhost:3000/api/creategroup', { groupname:this.groupname, username:this.username }, httpOptions).subscribe(
        (data:any)=>{
          if (data.id != 0){
            sessionStorage.setItem('groupname', this.groupname);
            console.log('Success.');
          } else {
            console.log("Error processing.");
          }
        }
    )
  }

  public removegroup(){
    console.log("Just tried to remove a group.");
    this.http.post<Group>('http://localhost:3000/api/removegroup', { groupname: this.groupname, username: this.username, role: this.role }, httpOptions).subscribe(
      (data:any)=>{
        if(data.id != 0){
          console.log('Successfully removed this group.');
        } else {
          console.log('Error removing group.');
        }
      }
    )
  }

  public modifygroup(){
    console.log('Changing name of group.');
    this.http.post<Group>('http://localhost:3000/api/modifygroup', { groupname: this.groupname, newgroupname: this.newgroupname, role: this.role, username: this.username }, httpOptions).subscribe(
      (data:any)=>{
        if(data.id != 0){
          console.log('Successfully modified group name.');
        } else {
          console.log('Error modifying group name.');
        }
      }
    )
  }

  public createchannel(){
    console.log('Creating a channel.');
    if(this.groupname === ''){
      alert('Please enter a valid group name.');
    }
    if(this.channelname === ''){
      alert('Please enter a valid channel name.');
    }

    this.http.post<Group>('http://localhost:3000/api/createchannel', { channelname: this.channelname, groupname: this.groupname, username: this.username, role: this.role }, httpOptions).subscribe(
      (data:any)=>{
        if(data.id != 0){
          console.log('Successfully added channel.');
        } else {
          console.log('Error creating channel.');
        }
      }
    )
  }

  public removechannel(){
    console.log('Removing a channel.');
    this.http.post<Group>('http://localhost:3000/api/removechannel', { channelname: this.channelname, groupname: this.groupname, username: this.username, role: this.role }, httpOptions).subscribe(
      (data:any)=>{
        if(data.id != 0){
          console.log('Successfully removed channel.');
        } else {
          console.log('Error removing channel.');
        }
      }
    )
  }


  public isUserAuthorised(): boolean {
    const userRole = sessionStorage.getItem('role');

    return userRole === 'superadmin' || userRole === 'groupadmin';
  }

  public isSuper(): boolean {
    const userRole = sessionStorage.getItem('role');
    return userRole === 'superadmin';
  }

  public isGroup(): boolean {

    return true;
  }

  public promoteuser(){
    console.log('Just tried to promote a user');
    this.http.post<User>('http://localhost:3000/api/promote', { pusername: this.pusername }, httpOptions). subscribe(
      (data:any)=>{
        if(data.id != 0){
          console.log('Successfully promoted.');
        } else {
          console.log('Error promoting user.');
        }
      }
    )
  }

  public removeuser(){
    console.log('Tried to remove a user from a group');
    this.http.post<User>('http://localhost:3000/api/removechatuser', { rusername: this.rusername, rgroup: this.rgroup }, httpOptions). subscribe(
      (data:any)=>{
        if(data.id != 0){
          console.log('User successfully removed');
        } else {
          console.log('Error removing user from group.');
        }
      }
    )
  }

  public getchannels(){
    console.log('Obtaining channel data');
    this.group = sessionStorage.getItem('groups');
    this.http.post<Group>('http://localhost:3000/api/getchannels', { group: this.group }, httpOptions). subscribe(
      (data:any)=>{
        if(data.channels){
          this.channels = data.channels;
          console.log('Channel data obtained', this.channels);
        } else {
          console.log('Failed to obtain channel data');
        }
      }
    );
  }

  public deleteself(){
    console.log('Deleting account');
    this.http.post<User>('http://localhost:3000/api/deleteaccount', { username: this.username }, httpOptions). subscribe(
      (data:any)=>{
        if(data){
          console.log('Account deleted successfully');
        } else {
          console.log('Failed to delete account');
        }
      }
    )
  }

  public changeprofilepic(){
    console.log('Changing profile picture');
    if (this.selectedImage){
      const formData = new FormData();
      console.log('Profile Picture:', this.profilepic);
      formData.append('username', this.username || '');
      formData.append('profilepic', this.selectedImage);
    
      this.http.post<User>('http://localhost:3000/api/changeprofilepic', formData). subscribe(
        (data:any)=>{
          if(data){
            console.log('Profile picture changed successfully');
          } else {
            console.log('Failed to change profile picture.');
          }
        }
      );
    } else {
      console.log('No image selected');
    }
  }

}

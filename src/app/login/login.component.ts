import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'
  })
};

const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName = '';
  password = '';


  constructor(private router: Router, private http:HttpClient){}
  

  ngOnInit(){}

  public taketoregister(){
    console.log('Taking to registration form');
    this.router.navigateByUrl('register');
  }
  public login(){
    console.log("Put in " + this.userName + " for the username and " + this.password + " for the password.")
    if(this.userName === ""){
      alert('Please put in username');
      return;
    }
    if(this.password === ""){
      alert('Please put in password');
      return;
    }
    this.http.post<User>('http://localhost:3000/api/auth', { username:this.userName, password:this.password }, httpOptions).subscribe(
        (data:any)=>{
          if (data.id != 0){
            sessionStorage.setItem('username', this.userName);
            sessionStorage.setItem('password', this.password);
            sessionStorage.setItem('role', data.role);
            sessionStorage.setItem('groups', data.groups);
            sessionStorage.setItem('profilepic', data.profilepic);
            this.router.navigateByUrl('account');
          } else {
            console.log("Error logging in.");
            alert('Invalid username or password, please try again');
            return;
          }
        }
    )
  }
}


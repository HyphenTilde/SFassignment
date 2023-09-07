import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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

  //constructor(private router: Router, private httpClient: HttpClient){}

  constructor(private router: Router){}
  
  requestBody = {
    username: this.userName,
    password: this.password
  };

  ngOnInit(){}

  public login(){
    console.log("Put in " + this.userName + " for the username and " + this.password + " for the password.")
    sessionStorage.setItem('username', this.userName);
    sessionStorage.setItem('password', this.password);
    this.router.navigateByUrl('account');
  }
}

//  public login(){
//    this.httpClient.post<any>('${BACKEND_URL}/login', this.requestBody, httpOptions)
//      .subscribe(response => {
//        if (response.authenticated){
//          sessionStorage.setItem('username', this.userName);
//          sessionStorage.setItem('password', this.password);

//          this.router.navigateByUrl('profile');
//        } else {
//          console.log('Authentication failed. Try again.');
//        }
//      })
//  }
//}

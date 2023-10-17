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

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';

  constructor(private router: Router, private http:HttpClient){}

  ngOnInit(){}

  public register(){
    console.log("Put in " + this.username + " for the username, " + this.email + " for the email and " + this.password + " for the password");
    if(this.username === ""){
      alert('Please put in username');
      return;
    }
    if(this.password === ""){
      alert('Please put in password');
      return;
    }
    if(this.email === ""){
      alert('Please put in email');
      return;
    }

    this.http.post<User>('http://localhost:3000/api/register', { username:this.username, email:this.email, password:this.password }, httpOptions).subscribe(
        (data:any)=>{
          if (data.id != 0){
            this.router.navigateByUrl('login');
          } else {
            console.log("Error registering.");
          }
        }
    )
  }
}

import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(private router: Router){}

  logout(){
    console.log("You just tried logging out.");
    sessionStorage.clear();
    this.router.navigateByUrl('login');
  }
}

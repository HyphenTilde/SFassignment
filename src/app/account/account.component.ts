import { Component, OnInit } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{
  username: string | null = null;
  groups: string[] = [];

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.groups = ['Group 1', 'Group 2', 'Group 3'];
  }

}

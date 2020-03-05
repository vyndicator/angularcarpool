import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database';
import { Observable } from 'rxjs';
import { User } from '../user.model';
import { registerLocaleData } from '@angular/common';
import localeDE from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';


@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})
export class UserviewComponent implements OnInit {

  users: Observable<User[]>;
  allUsers = [];

  constructor(database: AngularFireDatabase){
    registerLocaleData(localeDE, 'de-DE', localeDeExtra);
    this.users = database.list<User>('users').valueChanges();
    this.users.subscribe(users => {
      this.allUsers = users as User[];
    })

  }

  deleteUser(): void {
    alert("Delete User!");
  }

  editUser(): void {
    alert('Edit User!')
  }

  ngOnInit(): void {
  }

}

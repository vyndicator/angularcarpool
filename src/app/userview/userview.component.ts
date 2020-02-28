import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireList} from '@angular/fire/database';
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

  ngOnInit(): void {
  }

}

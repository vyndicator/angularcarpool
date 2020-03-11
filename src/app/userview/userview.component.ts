import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database';
import { Observable } from 'rxjs';
import { User } from '../user.model';
import { registerLocaleData } from '@angular/common';
import localeDE from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';

enum State {
  OPEN, CLOSED
}

@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})

export class UserviewComponent implements OnInit {

  numberOfCards = 0;

  users: Observable<User[]>;
  allUsers = [];
  cardState: boolean[] = [];

  constructor(database: AngularFireDatabase){
    registerLocaleData(localeDE, 'de-DE', localeDeExtra);
    this.users = database.list<User>('users').valueChanges();
    this.users.subscribe(users => {
      this.allUsers = users as User[];
      this.allUsers.forEach( user => this.cardState.push(false));
    })
  }

  deleteUser(): void {
    alert("Delete User!");
  }

  editUser(index: number): void {
    this.closeAllCards(index);
    
    
    this.cardState[index] = !this.cardState[index];
    
  }

  closeAllCards(index: number): void {
    for(let i = 0; i < this.cardState.length; i++) {
      if(i != index)
      this.cardState[i] = false;
    }
  }   

  ngOnInit(): void {
    
  }

}

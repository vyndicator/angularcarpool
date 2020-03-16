import { Component, OnInit, ɵCompiler_compileModuleAsync__POST_R3__ } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database';
import { Observable } from 'rxjs';
import { User } from '../user.model';
import { registerLocaleData } from '@angular/common';
import localeDE from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { MatDialogModule } from '@angular/material/dialog';
import { TouchSequence } from 'selenium-webdriver';
import { NONE_TYPE } from '@angular/compiler';


@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})

export class UserviewComponent implements OnInit {

  editWindowOpen: boolean = false;
  globalUserIndex : number = 0;

  userToAdd: User;
  numberOfCards = 0;
  users: any;
  allUsers = [];
  cardState: boolean[] = [];
  database: AngularFireDatabase;

  modal: any;

  constructor(database: AngularFireDatabase){
    registerLocaleData(localeDE, 'de-DE', localeDeExtra);
    this.users = database.list<User>('users');
    this.users.valueChanges().subscribe(users => {
      this.allUsers = users as User[];
      this.allUsers.forEach( user => this.cardState.push(false));
    })
    this.database = database;
    
    
  }

  deleteUser(id: string): void {
    let users = this.database.list('users', ref => ref.orderByChild('id').equalTo(id));
    let subscription = users.snapshotChanges().subscribe(a => a.forEach( b => {
      users.remove(b.key);
      subscription.unsubscribe();
    }));


  }

  openEditMenu(index: number): void {
    let open;
    this.closeAllCards(index);
    this.cardState[index] = !this.cardState[index];
    open = false;
    this.cardState.forEach(card => {
      if(card == true){
        open = true;
      }
    })

    if(open == true) {
      this.editWindowOpen = true;
    } else {
      this.editWindowOpen = false;
    }

  }

  editUser(id: number, index: number): void {
    let nameEdit = document.getElementsByClassName("name_edit")[index] as HTMLInputElement;
    let newName = nameEdit.value;
    let balanceEdit = document.getElementsByClassName("balance_edit")[index] as HTMLInputElement;
    let newBalance = balanceEdit.value;
    console.log(id);
    console.log(id)
    
      let users = this.database.list('users', ref => ref.orderByChild('id').equalTo(id));
      let subscription = users.snapshotChanges().subscribe(a => a.forEach( b => {
        if(newName != ""){
          console.log(b.key);
          users.update(b.key,{name: newName});
        }
        if(newBalance != ""){
          users.update(b.key,{balance: newBalance});
        }
        subscription.unsubscribe();
      }));
  }

  addUser():void {
    let nameInput = document.getElementById("nameInput") as HTMLInputElement;
    let name = nameInput.value;

    if(name != ""){
      this.users.push(new User(this.globalUserIndex, name, 0.00));
      this.globalUserIndex++;
      this.closeDialog();
    } else {
      let nameInput = document.getElementById("nameInput") as HTMLInputElement;
      nameInput.placeholder = "Please enter a valid name!";
      
    }
    
  }

  getUserIndex(): void {
    let allUsers = [];
    let users = this.database.list('users', ref => ref.orderByChild('id'));
    users.valueChanges().subscribe(a => {
      allUsers = a as User[];
      this.globalUserIndex = allUsers[allUsers.length -1].id;
      this.globalUserIndex++;
    });
    
  }

  openDialog(): void {
    this.modal.style.display = "block";
    let nameInput = document.getElementById("nameInput") as HTMLInputElement;
    nameInput.value = '';
    nameInput.placeholder = "";
    nameInput.focus();
    
  }

  closeDialog(): void {
    this.modal.style.display = "none";   

  }

  closeAllCards(index: number): void {
    for(let i = 0; i < this.cardState.length; i++) {
      if(i != index)
      this.cardState[i] = false;
    }
  }   

  ngOnInit(): void {
    this.getUserIndex();
    this.initModalBox();
  }
  
  initModalBox(): void {
    this.modal = document.getElementById("popup");
    this.modal.style.display = "none";
  }

}

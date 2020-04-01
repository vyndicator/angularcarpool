import { Component, OnInit, ɵCompiler_compileModuleAsync__POST_R3__ } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database';
import { User } from '../user.model';
import { registerLocaleData } from '@angular/common';
import localeDE from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { UsereditdialogComponent } from '../usereditdialog/usereditdialog.component';


@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})

export class UserviewComponent implements OnInit {

  globalUserIndex : number = 0;

  userToAdd: User;
  users: any;
  allUsers = [];
  database: AngularFireDatabase;


  constructor(database: AngularFireDatabase, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public dialog: MatDialog){
    registerLocaleData(localeDE, 'de-DE', localeDeExtra);
    this.users = database.list<User>('users');
    this.users.valueChanges().subscribe(users => {
      this.allUsers = users as User[];
    })
    this.database = database;
    
    iconRegistry.addSvgIcon(
      'addUser',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/person_add-24px.svg')
    );

     
    
  }

  deleteUser(id: string): void {
    let users = this.database.list('users', ref => ref.orderByChild('id').equalTo(id));
    let subscription = users.snapshotChanges().subscribe(a => a.forEach( b => {
      users.remove(b.key);
      subscription.unsubscribe();
    }));

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

  addUser(name: string):void {
    this.users.push(new User(this.globalUserIndex, name, 0.00));
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

  openEditDialog(): void {
    const dialogRef = this.dialog.open(UsereditdialogComponent, {
      width: '250px',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  ngOnInit(): void {
    this.getUserIndex();
  }
  


}

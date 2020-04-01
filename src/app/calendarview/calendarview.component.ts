import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database';
import { Drive } from '../drive.model';
import { User } from '../user.model';
import { registerLocaleData } from '@angular/common';
import localeDE from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-calendarview',
  templateUrl: './calendarview.component.html',
  styleUrls: ['./calendarview.component.css']
})
export class CalendarviewComponent implements OnInit {

  //Observables
  drives: any;
  allDrives = [];
  users: any;
  allUsers = [];


  constructor(database: AngularFireDatabase, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    registerLocaleData(localeDE, 'de-DE', localeDeExtra);
  
    this.drives = database.list<Drive>('drives');
    this.drives.valueChanges().subscribe(drives => {
      this.allDrives = drives as Drive[];
    })

    this.users = database.list<User>('users');
    this.users.valueChanges().subscribe(users => {
      this.allUsers = users as User[];
    })

    iconRegistry.addSvgIcon(
      'addDrive',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/add-24px.svg')
    );

  }
  
  addDrive(date: string, price: number, driver: User, passengers: User[] ): void {
    this.drives.push(new Drive(1, date, price, driver, passengers));
  }
  
  ngOnInit(): void {
 
  }


}

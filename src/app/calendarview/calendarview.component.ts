import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database';
import { Drive } from '../drive.model';
import { User } from '../user.model';
import { registerLocaleData } from '@angular/common';
import localeDE from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { DatepickerComponent } from '../datepicker/datepicker.component';



@Component({
  selector: 'app-calendarview',
  templateUrl: './calendarview.component.html',
  styleUrls: ['./calendarview.component.css']
})
export class CalendarviewComponent implements OnInit {

  @ViewChild(DatepickerComponent) datepicker;
  datePickerReference: DatepickerComponent;

  database: AngularFireDatabase;

  //Observables
  drives: any;
  allDrives = [];
  users: any;
  allUsers = [];

  constructor(database: AngularFireDatabase, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    registerLocaleData(localeDE, 'de-DE', localeDeExtra);
    this.database = database;
    this.getData();

    iconRegistry.addSvgIcon(
      'addDrive',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/add-24px.svg')
    );

    
  }
  
  addDrive(date: string, price: number, driver: User, passengers: User[] ): void {
    this.drives.push(new Drive(1, date, price, driver, passengers));
  }
  
  private getData(): void{
    this.drives = this.database.list<Drive>('drives');
    this.drives.valueChanges().subscribe(drives => {
      this.allDrives = drives as Drive[];
    })

    this.users = this.database.list<User>('users');
    this.users.valueChanges().subscribe(users => {
      this.allUsers = users as User[];
    })
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.datePickerReference = this.datepicker as DatepickerComponent;
  }


}

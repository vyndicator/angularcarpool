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
import { MatDialog } from '@angular/material/dialog';
import { DriveadddialogComponent } from '../dialogs/driveadddialog/driveadddialog.component';



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

  allDriveUsers = [];

  //data
  globalDriveIndex: number = 0;
  hasLoaded = false;

  constructor(database: AngularFireDatabase, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public driveAddDialog: MatDialog) {
    registerLocaleData(localeDE, 'de-DE', localeDeExtra);
    this.database = database;
    this.getData();

    iconRegistry.addSvgIcon(
      'addDrive',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/add-24px.svg')
    );

    this.getDriveIndex();
  }
  
  addDrive(date: string, price: number, driver: User, passengers: User[] ): void {
    this.drives.push(new Drive(this.globalDriveIndex, date, price, driver, passengers));   

    let newBalance = driver.balance + (passengers.length * price);
    this.updateBalance(driver, newBalance);
   
    passengers.forEach( passenger => {
      let newBalance = passenger.balance - price;
      this.updateBalance(passenger, newBalance);
    })
  }

  updateBalance(user: User, newBalance: number) {
    let users = this.database.list('users', ref => ref.orderByChild('id').equalTo(user.id));
    let subscription = users.snapshotChanges().subscribe(a => a.forEach( b => {
      users.update(b.key,{balance: newBalance});
      subscription.unsubscribe();
    }));
  }

  getDriveIndex(): void {
    let allDrives = [];
    let users = this.database.list('drives', ref => ref.orderByChild('id'));
    users.valueChanges().subscribe(a => {
      allDrives = a as Drive[];
      this.globalDriveIndex = allDrives[allDrives.length -1].id;
      this.globalDriveIndex++;
    });
    
  }
  
  private getData(): void{
    this.drives = this.database.list<Drive>('drives');
    this.drives.valueChanges().subscribe(drives => {
      this.allDrives = drives as Drive[];
    })

    this.users = this.database.list<User>('users');
    this.users.valueChanges().subscribe(users => {
      this.allUsers = users as User[];
      this.hasLoaded = true;
      if(this.allUsers.length > 0){
      }
    })
  }

  openAddDriveDialog(): void {
    const dialogRef = this.driveAddDialog.open(DriveadddialogComponent, {
      width: '500px',
      height: '500px',
      data: {
        all: this.allUsers
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != null){
        this.allDriveUsers = result;

        let date = this.datePickerReference.getSelectedDate();
        let driver = this.allDriveUsers[0] as User;
        let passengers = [];
        for(let i = 1; i < this.allDriveUsers.length; i++) {
          passengers.push(this.allDriveUsers[i]);
        }

        this.addDrive(date, 1.50, driver,passengers);
      }
    });
  }



  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.datePickerReference = this.datepicker as DatepickerComponent;
  }


}

import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import 'firebase/database';
import { Drive } from '../drive.model';
import { User } from '../user.model';
import { Datehelper } from './Datehelper';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {

  //Helper classes
  datehelper = new Datehelper();

  //Observables
  drives: any;
  allDrives = [];
  users: any;
  allUsers = [];

  //Datepicker data  
  days: string[] = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  allMonths: string[] = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  weeks: any[] = [[]];

  nameOfSelectedMonth: string;
  currentYear: number = 0;
  currentMonth: number = 0;
  todaysDate: Date;

  selectedDate: string;

  constructor(database: AngularFireDatabase) {
    this.todaysDate = new Date(); 
    this.currentYear = this.todaysDate.getFullYear();
    this.currentMonth = this.todaysDate.getMonth();

    this.selectedDate = this.todaysDate.getDate().toString();

    this.getData(database);
  }

  isDriveAvailable(clickedDate: any): boolean {
    
    let dateFound = false;

    this.allDrives.forEach( drive => {
        let currentDrive = drive as Drive;
        if(currentDrive.date == this.getSelectedDateAsString(clickedDate, this.currentMonth, this.currentYear)){
          dateFound = true;
        }
    });

    return dateFound;
  }

  isDateClicked(clickedDay: any): boolean {
    //TODO check for the selected not only based on the day -> implement Month and Year

    if(this.selectedDate == clickedDay){
      return true;
    }

    return false;
  }

  /**
   * Changes the selected month in the date picker
   * @param direction determines if to skip to next or last month
   */

  changeMonth(direction: number): void {
    if(direction == 2){
      this.currentMonth++;
      if(this.currentMonth > 11){
        this.currentMonth = 0;
        this.currentYear++;
      }
    } else if(direction == 1){
      this.currentMonth--;
      if(this.currentMonth < 0){
        this.currentMonth = 11;
        this.currentYear--;
      }
    }
    this.weeks = this.datehelper.calculateCurrentMonth(this.currentMonth, this.currentYear);
    this.getMonthName();
    this.selectedDate = null;
  }

  getSelectedDateAsString(clickedDate: string, currentMonth: number, currentYear: number): string {
    
    let month;
    let day;
    let selectedDay = parseInt(clickedDate);

    if(currentMonth < 10) {
      month = "0" + (currentMonth + 1);
    } else {
      month = "" + (currentMonth + 1);
    }

    if(selectedDay < 10) {
      day = "0" + clickedDate;
    } else {
      day = "" + clickedDate;
    }

    return day + "/" + month + "/" + currentYear;
  }

  private getData(database: AngularFireDatabase): void {
    this.drives = database.list<Drive>('drives');
    this.drives.valueChanges().subscribe(drives => {
      this.allDrives = drives as Drive[];
    })

    this.users = database.list<User>('users');
    this.users.valueChanges().subscribe(users => {
      this.allUsers = users as User[];
    })
  }

  getMonthName(): void {
    this.nameOfSelectedMonth = this.allMonths[this.currentMonth];
  }

  selectDate(day: any){
    this.selectedDate = day;
  }

  private getSelectedDate(): string{

    return this.getSelectedDateAsString(this.selectedDate, this.currentMonth, this.currentYear);
  }

  ngOnInit(): void {
    this.weeks = this.datehelper.calculateCurrentMonth(this.currentMonth, this.currentYear);
    this.getMonthName();
  }

}

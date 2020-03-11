import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database';
import { Observable, of } from 'rxjs';
import { Drive } from '../drive.model';
import { User } from '../user.model';
import { registerLocaleData } from '@angular/common';
import localeDE from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';

@Component({
  selector: 'app-calendarview',
  templateUrl: './calendarview.component.html',
  styleUrls: ['./calendarview.component.css']
})
export class CalendarviewComponent implements OnInit {

  drives: Observable<Drive[]>;
  allDrives = [];
  driver: User;
  passengers = [];

  days: string[] = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  weeks: any[] = [[]];
  nameOfMonth: string;

  date: Date;
  currentYear: number = 0;
  currentMonth: number = 0;
  
  selectedDate: String;

  constructor(database: AngularFireDatabase) {
    registerLocaleData(localeDE, 'de-DE', localeDeExtra);
    this.date = new Date(); 
    this.currentYear = this.date.getFullYear();
    this.currentMonth = this.date.getMonth();

    this.drives = database.list<Drive>('drives').valueChanges();
    this.drives.subscribe(drives => {
      this.allDrives = drives as Drive[];
    })

   }

  ngOnInit(): void {
    this.calculateDates();
  }

  showDrive(clickedDate: string): void {

    this.driver = null;
    this.passengers = [];
    this.selectedDate = this.createDateString(clickedDate);
    this.allDrives.forEach( drive => {
      if(drive.date == this.selectedDate) {
        this.driver = drive.driver;
        drive.passengers.forEach(passenger => {
          this.passengers.push(passenger as User);
        })
      }
    })


  }

  markDriveDates(currentDay: string): boolean {

    let date = this.createDateString(currentDay);
    let isFound = false;

    this.allDrives.forEach( drive => {
      if(drive.date === date){
        isFound = true;
      }
    })
    return isFound;
  }

  createDateString(clickedDate: string): string {
    
    let month;
    let day;
    let selectedDay = parseInt(clickedDate);

    if(this.currentMonth < 10) {
      month = "0" + (this.currentMonth + 1);
    } else {
      month = "" + (this.currentMonth + 1);
    }

    if(selectedDay < 10) {
      day = "0" + clickedDate;
    } else {
      day = "" + clickedDate;
    }

    return day + "/" + month + "/" + this.currentYear;
  }

  calculateDates(): void {
   
    let firstDay = new Date(this.currentYear, this.currentMonth, 1);
    let lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);

    let allDays: any[] = [];
    let indexOfStartDay;
    let numberOfWeeks = 1;

    this.weeks = [[]];
    this.getMonthName();

    indexOfStartDay = firstDay.getDay();
    if(indexOfStartDay == 0) {
      indexOfStartDay = 7;
    }
    indexOfStartDay--;

    for(let i = 0; i < indexOfStartDay; i++){
      allDays.push(null);
    }

    for(let i = 1; i <= lastDay.getDate(); i++){
      allDays.push(new Date(this.currentYear, this.currentMonth, i));
    }

    let indexOfLastDay = lastDay.getDay();
    if(indexOfLastDay == 0){
      indexOfLastDay = 7;
    }
    indexOfLastDay--;

    let daysOfLastWeekLeft = 6 - indexOfLastDay;

    for(let i = 0; i < daysOfLastWeekLeft; i++){
      allDays.push(null);
    }
    
    let day_old = new Date(this.currentYear, this.currentMonth, 1);

    allDays.forEach(day => {
      if(day != null){
        if(day.getDay() == 1 && day_old.getDay() == 0){
          numberOfWeeks++;
        }

        day_old = day;
      }
    })
    console.log(numberOfWeeks);
    
    for(let i = 0; i < 5; i++){
      this.weeks.push( [] );
    }
    
    let temp = 0;

    for(let i = 0; i <= numberOfWeeks; i++){
      for(let j = 0; j < 7; j++){
        if(allDays[temp] == null){
          this.weeks[i].push("");
        } else {
          this.weeks[i].push(allDays[temp].getDate().toString());
        }
        temp++;
      }
    }

  }

  getMonthName(): void {
    switch(this.currentMonth){
      case 0: 
        this.nameOfMonth = "January";
        break;
      case 1: 
        this.nameOfMonth = "February";
        break;
      case 2: 
        this.nameOfMonth = "March";
        break;
      case 3: 
        this.nameOfMonth = "April";
        break;
      case 4: 
        this.nameOfMonth = "May";
        break;
      case 5: 
        this.nameOfMonth = "June";
        break;
      case 6: 
        this.nameOfMonth = "July";
        break;
      case 7: 
        this.nameOfMonth = "August";
        break;
      case 8: 
        this.nameOfMonth = "September";
        break;
      case 9: 
        this.nameOfMonth = "October";
        break;
      case 10: 
        this.nameOfMonth = "November";
        break;
      case 11: 
        this.nameOfMonth = "December";
        break;
    }
  }

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
    this.calculateDates();
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendarview',
  templateUrl: './calendarview.component.html',
  styleUrls: ['./calendarview.component.css']
})
export class CalendarviewComponent implements OnInit {

  days: string[] = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  weeks: any[] = [[]];
  nameOfMonth: string;

  date: Date;
  currentYear: number = 0;
  currentMonth: number = 0;

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
        if(day.getDay() < day_old.getDay()){
          numberOfWeeks++;
        }

        day_old = day;
      }
    })
  
    
    for(let i = 0; i < numberOfWeeks; i++){
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
    console.log(this.currentMonth);
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
    } else if(direction == 1){
      this.currentMonth--;
    }

    this.calculateDates();
  }


  constructor() {
    this.date = new Date(); 
    this.currentYear = this.date.getFullYear();
    this.currentMonth = this.date.getMonth();
   }

  ngOnInit(): void {
    this.calculateDates();
  }

}

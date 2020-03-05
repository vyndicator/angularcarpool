import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendarview',
  templateUrl: './calendarview.component.html',
  styleUrls: ['./calendarview.component.css']
})
export class CalendarviewComponent implements OnInit {

  days: string[] = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  weeks: any[] = [[]];

  calculateDates(): void {

    let date = new Date(); 
    let currentYear = date.getFullYear();
    let currentMonth = date.getMonth();
    
    let firstDay = new Date(currentYear, currentMonth, 1);
    let lastDay = new Date(currentYear, currentMonth + 1, 0);

    let allDays: any[] = [];
    let indexOfStartDay;
    let numberOfWeeks = 1;

    indexOfStartDay = firstDay.getDay();
    if(indexOfStartDay == 0) {
      indexOfStartDay = 7;
    }
    indexOfStartDay--;

    for(let i = 0; i < indexOfStartDay; i++){
      allDays.push(null);
    }

    for(let i = 1; i <= lastDay.getDate(); i++){
      allDays.push(new Date(currentYear, currentMonth, i));
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
    
    let day_old = new Date(currentYear, currentMonth, 1);

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

    console.log(this.weeks);
  }




  constructor() {
      
   }

  ngOnInit(): void {
    this.calculateDates();
  }

}

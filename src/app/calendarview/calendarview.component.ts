import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendarview',
  templateUrl: './calendarview.component.html',
  styleUrls: ['./calendarview.component.css']
})
export class CalendarviewComponent implements OnInit {

  days: string[] = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  weeks: number[][] = [[24,25,26,27,28,29,1],
                       [2,3,4,5,6,7,8],
                       [9,10,11,12,13,14,15],
                       [16,17,18,19,20,21,22],
                       [23,24,25,26,27,28,29],
                       [30,31,1,2,3,4,5]];

  constructor() { }

  ngOnInit(): void {
  }

}
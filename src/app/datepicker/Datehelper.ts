export class Datehelper {
    
    /**
     * 
     * Class is used to generate the needed data for the date picker.
     * 
     */

    constructor(){}

    /**
     * The method generates the array of days for every month.
     * 
     * @param currentMonth the index of the currently selected month
     * @param currentYear the index of the currently selected year
     */

    calculateCurrentMonth(currentMonth: number, currentYear: number,): any {
   
    let firstDay = new Date(currentYear, currentMonth, 1);
    let lastDay = new Date(currentYear, currentMonth + 1, 0);

    let allDays: any[] = [];
    let indexOfStartDay;
    let numberOfWeeks = 1;

    let weeksOfCurrentMonth = [[]];

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
        if(day.getDay() == 1 && day_old.getDay() == 0){
          numberOfWeeks++;
        }

        day_old = day;
      }
    })
    
    for(let i = 0; i < 5; i++){
        weeksOfCurrentMonth.push( [] );
    }
    
    let temp = 0;

    for(let i = 0; i <= numberOfWeeks - 1; i++){
      for(let j = 0; j < 7; j++){
        if(allDays[temp] == null){
            weeksOfCurrentMonth[i].push("");
        } else {
            weeksOfCurrentMonth[i].push(allDays[temp].getDate().toString());
        }
        temp++;
      }
    }

    return weeksOfCurrentMonth;
  }

 

}
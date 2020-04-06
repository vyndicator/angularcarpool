import { Component, Inject } from '@angular/core';
import { CalendarviewComponent } from 'src/app/calendarview/calendarview.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/user.model';

@Component({
  selector: 'app-driveadddialog',
  templateUrl: './driveadddialog.component.html',
  styleUrls: ['./driveadddialog.component.css']
})
export class DriveadddialogComponent {
  driver: any;
  passengers: User[];
  passengersInDrive: User[];
  result: User[];


  constructor(public dialogRef: MatDialogRef<CalendarviewComponent>, 
    @Inject(MAT_DIALOG_DATA) public users: any)  {

    if(this.users.all.length > 0){
      this.driver = this.users.all[0];
    }
    this.rearrangePassengers();

  }
  
  rearrangePassengers() {
  
    this.passengers = [];
    this.users.all.forEach(user => {
      if(this.driver != user){
        this.passengers.push(user);
      }
    });
    let user = this.driver as User;

    this.result = [];
    this.result.push(this.driver);
  }

  onChange(event) {

    let user = event.source.value as User;

    if(event.checked){
      this.result.push(user);
    } else {
      const index = this.result.indexOf(user);
      if(index > -1) {
        this.result.splice(index, 1);
      }
    }

  }

  onNoClick(): void {
    this.dialogRef.close();
    
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserviewComponent } from 'src/app/userview/userview.component';

@Component({
  selector: 'app-useradddialog',
  templateUrl: './useradddialog.component.html',
  styleUrls: ['./useradddialog.component.css']
})
export class UseradddialogComponent {

  result: string;

  constructor(public dialogRef: MatDialogRef<UserviewComponent>) { }




  onNoClick(): void {
    this.dialogRef.close();
  }
}

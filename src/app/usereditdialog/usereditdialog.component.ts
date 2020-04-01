import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserviewComponent } from '../userview/userview.component';

@Component({
  selector: 'app-usereditdialog',
  templateUrl: './usereditdialog.component.html',
  styleUrls: ['./usereditdialog.component.css']
})
export class UsereditdialogComponent{

  constructor(public dialogRef: MatDialogRef<UserviewComponent>){

  }
    
  onNoClick(): void {
    this.dialogRef.close();
  }

}

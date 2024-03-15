import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';
@Component({
  selector: 'app-dialog-for-submit',
  templateUrl: './dialog-for-submit.component.html',
  styleUrls: ['./dialog-for-submit.component.scss']
})
export class DialogForSubmitComponent implements OnInit {
  constructor(public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: {res: any}) {}
  ngOnInit(): void {
    console.log(this.data.res);
    
  }

 
}

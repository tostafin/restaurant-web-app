import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dish-dialog',
  templateUrl: './delete-dish-dialog.component.html',
  styleUrls: ['./delete-dish-dialog.component.css']
})
export class DeleteDishDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string}) {
  }

  ngOnInit(): void {
  }

}

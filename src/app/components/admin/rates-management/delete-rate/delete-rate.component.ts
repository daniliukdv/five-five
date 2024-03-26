import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DIALOG_DATA } from '@angular/cdk/dialog';

@Component({
  selector: 'app-delete-rate',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './delete-rate.component.html',
  styleUrl: './delete-rate.component.scss',
})
export class DeleteRateComponent {
  constructor(
    @Inject(DIALOG_DATA) public data: any,
    public dialog: MatDialogRef<any>,
  ) {}
}

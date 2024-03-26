import { Component, Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-edit-rate',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    NgIf,
  ],
  templateUrl: './add-edit-rate.component.html',
  styleUrl: './add-edit-rate.component.scss',
})
export class AddEditRateComponent {
  public rateForm: FormGroup | any;
  constructor(
    @Inject(DIALOG_DATA) public data: any,
    public dialog: MatDialogRef<any>,
    private formBuilder: FormBuilder,
  ) {
    this.initialize();
  }

  private initialize() {
    this.rateForm = this.formBuilder.group({
      name: [
        null,
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      code: [null, Validators.compose([Validators.required])],
      buy: [null, Validators.compose([Validators.required])],
      sell: [null, Validators.compose([Validators.required])],
      wholesaleSell: [null, Validators.compose([Validators.required])],
      wholesaleBuy: [null, Validators.compose([Validators.required])],
    });

    if (this.data) {
      this.rateForm.patchValue(this.data);
    }
  }
}

import { Component, inject, Inject } from '@angular/core';
import { MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { CalculatorComponent } from '../calculator/calculator.component';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-application',
  standalone: true,
  imports: [
    MatDialogClose,
    MatIconModule,
    MatDialogContent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    CalculatorComponent,
    NgIf,
  ],
  templateUrl: './create-application.component.html',
  styleUrl: './create-application.component.scss',
})
export class CreateApplicationComponent {
  private functions: Functions = inject(Functions);

  public applicationForm = { name: null, tel: null };
  public loading = false;

  constructor(
    @Inject(DIALOG_DATA) public data: any,
    public dialogRef: DialogRef<string>,
    private toast: ToastrService,
  ) {
    if (this.data) {
      this.applicationForm = { ...this.data, ...this.applicationForm };
    }
  }

  async createApplication() {
    this.loading = true;

    const newApplication = httpsCallable(this.functions, 'createApplication');
    await newApplication(this.applicationForm);

    this.loading = false;

    this.dialogRef.close();
    this.toast.success('Заявка успішно відправлена!');
  }
}

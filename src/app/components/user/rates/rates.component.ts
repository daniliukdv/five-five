import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';

import { Dialog } from '@angular/cdk/dialog';
import { CreateApplicationComponent } from '../create-application/create-application.component';
import { RatesTableComponent } from '../../../shared/rates-table/rates-table.component';

@Component({
  selector: 'app-rates',
  standalone: true,
  templateUrl: './rates.component.html',
  styleUrl: './rates.component.scss',
  imports: [NgForOf, RatesTableComponent],
})
export class RatesComponent {
  constructor(private dialog: Dialog) {}

  createApplication() {
    this.dialog.open(CreateApplicationComponent);
  }
}

import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { RatesComponent } from './rates/rates.component';
import { AboutComponent } from './about/about.component';
import { CalculatorComponent } from './calculator/calculator.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    HeaderComponent,
    CalculatorComponent,
    ContactsComponent,
    RatesComponent,
    AboutComponent,
    NgForOf,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {}

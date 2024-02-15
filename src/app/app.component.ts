import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { RatesComponent } from './components/rates/rates.component';
import { AboutComponent } from './components/about/about.component';
import { NgForOf } from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    ContactsComponent,
    RatesComponent,
    AboutComponent,
    NgForOf,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public rates = [
    {
      code: 'usd',
      name: 'Доллар США',
      buy: 37.95,
      sell: 38.25,
    },
    {
      code: 'eur',
      name: 'Євро',
      buy: 41.15,
      sell: 41.81,
    },
    {
      code: 'pln',
      name: 'Польский злотий',
      buy: 9.44,
      sell: 9.68,
    },
  ];
}

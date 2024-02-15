import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-rates',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './rates.component.html',
  styleUrl: './rates.component.scss',
})
export class RatesComponent {
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

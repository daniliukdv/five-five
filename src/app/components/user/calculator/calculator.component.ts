import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';

import {
  collection,
  collectionData,
  Firestore,
  orderBy,
  query,
} from '@angular/fire/firestore';
import { Dialog } from '@angular/cdk/dialog';
import { CreateApplicationComponent } from '../create-application/create-application.component';
import BigNumber from 'bignumber.js';

BigNumber.config({
  ERRORS: false,
  FORMAT: {
    decimalSeparator: '.',
    groupSeparator: '',
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: ' ',
    fractionGroupSize: 0,
  },
});

class Rate {
  buy: number;
  sell: number;
  code: string;
  name: string;
  wholesaleSell: number;
  wholesaleBuy: number;

  constructor() {
    this.buy = 0;
    this.sell = 0;
    this.code = '';
    this.name = '';
    this.wholesaleSell = 0;
    this.wholesaleBuy = 0;
  }
}

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf, NgTemplateOutlet],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
})
export class CalculatorComponent implements OnInit {
  private firestore: Firestore = inject(Firestore);
  public rates: any[] = [];
  public uahRate = {
    code: 'uah',
    name: 'Українська гривня',
    buy: 0,
    sell: 0,
  };

  public calculator: any = {
    buyAmount: null,
    buyCurrency: new Rate(),
    sellAmount: null,
    sellCurrency: new Rate(),
  };

  public isReversed = false;

  constructor(private dialog: Dialog) {}

  ngOnInit() {
    const store = collection(this.firestore, 'rates');
    collectionData(query(store, orderBy('name', 'asc')), {
      idField: 'id',
    }).subscribe((rates) => {
      if (!rates?.length) {
        return;
      }

      this.rates = rates;
      this.calculator = {
        ...this.calculator,
        buyCurrency: this.rates[0],
        sellCurrency: this.uahRate,
      };
    });
  }

  onCurrencyChange(isSell: boolean) {
    this.calculate(isSell);
  }

  onInputValueChange(isSell: boolean) {
    this.calculate(isSell);
  }

  onReverseBuySell() {
    this.isReversed = !this.isReversed;

    this.calculator = {
      buyAmount: this.calculator.sellAmount,
      sellAmount: this.calculator.buyAmount,
      buyCurrency: this.calculator.sellCurrency,
      sellCurrency: this.calculator.buyCurrency,
    };

    this.calculate(this.isReversed);
  }

  onCreateApplication() {
    this.dialog.open(CreateApplicationComponent, { data: this.calculator });
  }

  private calculate(isSell: boolean) {
    if (!this.calculator.sellAmount && !this.calculator.buyAmount) {
      return;
    }
    console.log(this.calculator);
    const BN = (n: number) => new BigNumber(n?.toString());

    if (isSell) {
      if (this.calculator.sellCurrency.code !== this.uahRate.code) {
        const key =
          this.calculator.sellAmount >= 5000 ? 'wholesaleSell' : 'sell';
        this.calculator.buyAmount = BN(this.calculator.sellAmount || 0)
          .mul(BN(this.calculator.sellCurrency[key]))
          .toFormat(2);
      } else {
        const key =
          this.calculator.sellAmount / this.calculator.buyCurrency.sell >= 5000
            ? 'wholesaleSell'
            : 'sell';
        this.calculator.buyAmount = BN(this.calculator.sellAmount || 0)
          .div(BN(this.calculator.buyCurrency[key]))
          .toFormat(2);
      }
    } else {
      if (this.calculator.buyCurrency.code !== this.uahRate.code) {
        const key = this.calculator.buyAmount >= 5000 ? 'wholesaleBuy' : 'buy';
        this.calculator.sellAmount = BN(this.calculator.buyAmount || 0)
          .mul(BN(this.calculator.buyCurrency[key]))
          .toFormat(2);
      } else {
        this.calculator.sellAmount = BN(this.calculator.buyAmount || 0)
          .div(BN(this.calculator.sellCurrency.sell))
          .toFormat(2);
      }
    }
  }
}

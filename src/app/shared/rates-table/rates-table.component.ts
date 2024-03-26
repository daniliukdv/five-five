import { Component, inject } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  orderBy,
  query,
} from '@angular/fire/firestore';
import { NgForOf, NgIf } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rates-table',
  standalone: true,
  imports: [NgForOf, NgIf, MatSlideToggleModule, FormsModule],
  templateUrl: './rates-table.component.html',
  styleUrl: './rates-table.component.scss',
})
export class RatesTableComponent {
  private firestore: Firestore = inject(Firestore);
  public rates: any;
  public showWholesale = false;

  constructor() {
    const store = collection(this.firestore, 'rates');

    collectionData(query(store, orderBy('name', 'asc')), {
      idField: 'id',
    }).subscribe((rates) => {
      this.rates = rates;
    });
  }
}

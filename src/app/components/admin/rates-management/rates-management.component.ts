import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  orderBy,
  query,
  updateDoc,
} from '@angular/fire/firestore';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddEditRateComponent } from './add-edit-rate/add-edit-rate.component';
import { DeleteRateComponent } from './delete-rate/delete-rate.component';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rates-management',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    NgIf,
    RouterLink,
  ],
  templateUrl: './rates-management.component.html',
  styleUrl: './rates-management.component.scss',
})
export class RatesManagementComponent {
  private firestore: Firestore = inject(Firestore);

  public displayedColumns: string[] = [
    'name',
    'code',
    'buy',
    'sell',
    'wholesaleBuy',
    'wholesaleSell',
    'actions',
  ];
  public rates: any;

  constructor(
    private dialog: MatDialog,
    private toast: ToastrService,
  ) {
    const store = collection(this.firestore, 'rates');
    collectionData(query(store, orderBy('name', 'asc')), {
      idField: 'id',
    }).subscribe((rates) => {
      this.rates = rates;
    });
  }

  addRate() {
    this.dialog
      .open(AddEditRateComponent)
      .afterClosed()
      .subscribe(async (result) => {
        if (!result) return;

        const ref = collection(this.firestore, 'rates');
        await addDoc(ref, result);
        this.toast.info(`Валюта ${result.name} була успішно додана`);
      });
  }

  async editRate({ ...data }) {
    const { buy, sell, id, wholesaleSell, wholesaleBuy } = data;
    const ref = doc(this.firestore, 'rates', id);

    this.dialog
      .open(AddEditRateComponent, { data })
      .afterClosed()
      .subscribe(async (result: any) => {
        if (result.buy) {
          const docData = {
            ...result,
            buyStatus: result.buy >= buy ? 'increased' : 'decreased',
            sellStatus: result.sell >= sell ? 'increased' : 'decreased',
            wholesaleSellStatus:
              result.wholesaleSell >= wholesaleSell ? 'increased' : 'decreased',
            id,
            wholesaleBuyStatus:
              result.wholesaleBuy >= wholesaleBuy ? 'increased' : 'decreased',
          };
          console.log(docData);
          await updateDoc(ref, docData);
        }
      });
  }

  deleteRate(data: any) {
    const deleteRef = this.dialog.open(DeleteRateComponent, { data });

    deleteRef.afterClosed().subscribe(async (result) => {
      if (!result) {
        return;
      }

      const ref = doc(this.firestore, 'rates', data.id);
      const el = await getDoc(ref);

      await deleteDoc(ref);
      const name = (el.data() as any).name;
      this.toast.info(`Валюта ${name} була успішно видалена`);
    });
  }
}

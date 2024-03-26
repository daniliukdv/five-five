import { Component, OnInit } from '@angular/core';
import { RatesManagementComponent } from './rates-management/rates-management.component';
import {
  getAuth,
  authState,
  signOut,
  signInWithPopup,
} from '@angular/fire/auth';
import { GoogleAuthProvider } from 'firebase/auth';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RatesManagementComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  async ngOnInit() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    // await signOut(auth);

    authState(auth).subscribe(
      async (user) => {
        if (!user) {
          await signInWithPopup(auth, provider);
        }
      },
      (e) => {
        console.log(e);
      },
    );
  }
}

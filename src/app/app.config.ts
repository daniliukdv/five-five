import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { USE_EMULATOR } from '@angular/fire/compat/auth';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { getAuth, provideAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAG_7oUvQmz-GkJnWdYhO91gYo_wS0rdmY',
  authDomain: 'five-five-412807.firebaseapp.com',
  databaseURL:
    'https://five-five-412807-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'five-five-412807',
  storageBucket: 'five-five-412807.appspot.com',
  messagingSenderId: '324545464714',
  appId: '1:324545464714:web:5cbd96f8ab3ce56ef7a073',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideToastr({
      positionClass: 'toast-bottom-right',
    }),
    { provide: USE_EMULATOR, useValue: ['localhost', 4200] },
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideFirestore(() => getFirestore()),
      provideFunctions(() => getFunctions()),
      provideAuth(() => getAuth()),
    ),
  ],
};

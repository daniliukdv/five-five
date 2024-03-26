import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  public cards = [
    {
      title: 'Вигідний курс',
      description:
        'Найвигідніший і актуальний обмінний курс валют у Кропивницькому та області',
      icon: './assets/images/currency.svg',
    },
    {
      title: 'Безпека обміну',
      description:
        'Ми гарантуємо безпеку обміну валют. Можливо супровід до машини клієнта',
      icon: './assets/images/safe.svg',
    },
    {
      title: 'Фіксація курсу',
      description:
        'Залиште заявку на сайті і ми зафіксуємо курс і потрібну суму на 1 годину',
      icon: './assets/images/fixed.svg',
    },
  ];
}

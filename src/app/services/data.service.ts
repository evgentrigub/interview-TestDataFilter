import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getItems(): Observable<Item[]> {

    const items: Item[] = [
      {
        name: 'First',
        type: 1
      },
      {
        name: 'Second',
        type: 2
      },
      {
        name: 'Third',
        type: 3
      },
      {
        name: 'First',
        type: 4
      },
      {
        name: 'Second',
        type: 5
      },
      {
        name: 'Third',
        type: 6
      }
    ];

    return of(items);
  }
}

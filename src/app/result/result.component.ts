import { Component, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { switchMap, filter, map, flatMap, first } from 'rxjs/operators';
import { Item } from '../models/item';
import { Subscription, of, Observable, from } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {

  filteredData$: Observable<Item[]>;
  data$: Observable<Item[]>;

  displayedColumns: string[] = ['name', 'type'];

  options: Item = {
    name: null,
    type: 0
  };

  constructor(
    private service: DataService,
    private activatedRouter: ActivatedRoute,
  ) {
    this._getData();
    this.activatedRouter.queryParams.subscribe((option: Item) => {
      if (option && (option.name || option.type)) {
        this.filteredData$ = this.data$.pipe(
          map(items => this._getFilteredData(items, option))
        );
      } else {
        this.filteredData$ = this.data$;
      }
    });
  }

  _getFilteredData(data: Item[], option: Item): Item[] {
    return data.filter(
      item => {
        const isOptionName = item.name.toLowerCase() === option.name.toLowerCase();
        const isOptionType = item.type === +option.type;
        if (option.name && option.type) {
          return isOptionName && isOptionType;
        }
        return isOptionName || isOptionType;
      }
    );
  }

  _getData(): void {
    this.data$ = this.service.getItems();
  }

}

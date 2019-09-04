import { Component, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { switchMap } from 'rxjs/operators';
import { Item } from '../models/item';
import { Subscription, of, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnDestroy {

  private readonly subscription: Subscription;

  originalData$: Observable<Item[]>;
  data$: Observable<Item[]>;
  filteredData$: Observable<Item[]>;

  displayedColumns: string[] = ['name', 'type'];

  options: Item = {
    name: null,
    type: 0
  };

  constructor(
    private service: DataService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
  ) {
    this.subscription = this.activatedRouter.queryParams.subscribe((option: Item) => {
      this.data$ = this.getData();

      if (option && (option.name || option.type)) {
        this.options = option;
        this.originalData$ = this.data$;

        this.filteredData$ = this.data$.pipe(
          switchMap(data => this._getFilteredData(data, option))
        );

      } else {
        this.reset();
      }
    });
  }

  getData(): Observable<Item[]> {
    return this.service.getItems();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  reset() {
    this.router.navigate([], { queryParams: {} });
    this.filteredData$ = this.originalData$;
  }

  _getFilteredData(data: Item[], option: Item) {
    return of(data.filter(
      item => {
        if (option.name && option.type) {
          return item.name.toLowerCase() === option.name.toLowerCase() && item.type === +option.type;
        }
        return item.name.toLowerCase() === option.name.toLowerCase() || item.type === +option.type;
      }));
  }
}

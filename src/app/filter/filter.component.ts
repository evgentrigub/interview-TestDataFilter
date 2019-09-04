import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Item } from '../models/item';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  formGroup: FormGroup;
  numbers: number[] = [1, 2, 3, 4, 5, 6];
  params: Item;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: [''],
      type: []
    });
  }

  search() {
    this.params = this.formGroup.value;
    this.router.navigate([''], { queryParams: this.params });
  }

}

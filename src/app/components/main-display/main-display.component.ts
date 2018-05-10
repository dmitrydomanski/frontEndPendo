import { Component, OnInit } from '@angular/core';
import { ICity } from '../../models/city.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-main-display',
  templateUrl: './main-display.component.html',
  styleUrls: ['./main-display.component.css'],
})

export class MainDisplayComponent implements OnInit {

  cities: ICity[];
  selectedCity: string;
  tableMode = false;

  constructor(private dataService: DataService) {  }

  ngOnInit() {
    this.cities = this.dataService.createCitiesArray();
  }

  /**
   * changes the view mode
   * to let the table be displayed
   */
  cityChanged() {
    this.tableMode = true;
  }
 }

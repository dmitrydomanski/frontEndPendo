import { Component, OnInit } from '@angular/core';
import { ICity } from '../../models/city.model';
import { DataService } from '../../services/data.service';
import { DataTableComponent } from '../data-table/data-table.component';

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
    
    // creating a cities array for select options

    this.cities = this.dataService.createCitiesArray();
  }

  // changing mode of the view to display a table instead of ISS image

  cityChanged(){
    this.tableMode = true;
  }
 }

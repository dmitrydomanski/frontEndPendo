import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { DataService } from '../../services/data.service';
import { ICity } from '../../models/city.model';
import { IPass } from '../../models/pass.model';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnChanges {

  @Input() cityName: string;
  @Input() cities: ICity[];
  public dataSource = new MatTableDataSource();
  public displayedColumns = ['Rise', 'Duration', 'Day/Night'];

  constructor(private dataService: DataService) {
  }

  // detecting changes in a parent component

  ngOnChanges(changes: SimpleChanges) {
    if (typeof changes.cityName !== undefined) {
      this.requestData(changes.cityName.currentValue);
    }

  }

  // requesting data on a selected city, changing the view to display table

  requestData(city) {
    const cityObject = this.cities.find(c => c.name === city);
    this.dataService.getData(cityObject.lat, cityObject.lng).subscribe(data => {
      this.dataSource.data = data.response.map(element => {
        return { risetime: element.risetime, duration: element.duration, daytime: false };
      });
      this.getUniqueDates(data.response).forEach(d => this.dataService.getSunRise(cityObject.lat, cityObject.lng, d).subscribe(smth => {
        console.log(smth);
      }));
    });
  }

  // extracting unique elements from an array to use further
  unique(value, index, self) {
    return self.indexOf(value) === index;
  }

  getUniqueDates(response) {
    const dates = response.map(p => {
      return new Date(p.risetime * 1000).getFullYear() + '-' + (new Date(p.risetime * 1000).getMonth() + 1)
        + '-' + new Date(p.risetime * 1000).getDate();
    });
    return dates.filter(this.unique);
  }

  //   console.log(data.response);
  //   const dates = data.response.map(p => {
  //     return new Date(p.risetime * 1000).getFullYear() + '-' + (new Date(p.risetime * 1000).getMonth() + 1)
  //       + '-' + new Date(p.risetime * 1000).getDate();
  //   });
  //   const uniqueDays = dates.filter(this.unique);
  //   console.log(dates, uniqueDays);
  // });
}

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
  public dayparameters: Object[];
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
        return new IPass(this.getShortDate(element.risetime), element.risetime, element.duration, false);
      });

      const passes: IPass[] = this.dataSource.data;
      const ud = new Set(passes.map(p => p.date));

      ud.forEach(d => this.dataService.getSunRise(cityObject.lat, cityObject.lng, d).subscribe(res => {

// this.dayparameters = res.map()
        // console.log(res);
        // this.dayparameters.push(res);
        // this.dayparameters = res.results.map(el => {
        //   return { date: d, sunrise: el.sunrise, sunset: el.sunset };
        // });
        // console.log(this.dayparameters);
      }));
    });
  }

  // extracting unique elements from an array to use further
  unique(value, index, self) {
    return self.indexOf(value) === index;
  }

  getUniqueDates(r) {
    const dates = r.map(p => {
      this.getShortDate(p.risetime);
    });
    console.log(r);
    console.log(dates);
    return dates.filter(this.unique);
  }

  // is valid for timestamp in seconds only
  getShortDate(timestamp) {
    return new Date(timestamp * 1000).getFullYear() + '-' + (new Date(timestamp * 1000).getMonth() + 1)
      + '-' + new Date(timestamp * 1000).getDate();
  }

}

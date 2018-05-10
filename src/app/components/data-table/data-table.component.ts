import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { DataService } from '../../services/data.service';
import { ICity } from '../../models/city.model';
import { IDay } from '../../models/day.model';
import { IPass } from '../../models/pass.model';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnChanges {

  @Input() cityName: string;
  @Input() cities: ICity[];
  public dayparameters: IDay[] = new Array();
  public dataSource = new MatTableDataSource();
  public displayedColumns = ['Rise', 'Duration', 'Day/Night'];

  constructor(private dataService: DataService) {
  }

  // detecting changes in a parent component
  ngOnChanges(changes: SimpleChanges) {
    // setting new arrays instead of previously populated
    this.dataSource.data = new Array<IPass>();
    this.dayparameters = new Array<IDay>();

    // making a new request for data
    if (typeof changes.cityName !== undefined) {
      this.requestData(changes.cityName.currentValue);
    }
  }

  // requesting data on a selected city, changing the view to display table
  requestData(city) {

    // getting the city for ISS request
    const cityObject = this.cities.find(c => c.name === city);

    // sending ISS request, mapping reponse for IPass array
    this.dataService.getData(cityObject.lat, cityObject.lng).subscribe(data => {
      this.dataSource.data = data.response.map(element => {
        console.log(element.risetime, typeof cityObject.timezone);
        return new IPass(this.getShortDate(element.risetime), (element.risetime), element.duration);
      });

      // creating an array of unique dates to reduce number of day/night requests
      const passes: IPass[] = this.dataSource.data;
      const ud = new Set(passes.map(p => p.date));

      // making a day/night request, mapping response to seconds
      ud.forEach(d => this.dataService.getSunRise(cityObject.lat, cityObject.lng, d)
        .map(res => {
          return new IDay(res.date,
            (Date.parse(res.rslt.results.sunrise) + cityObject.timezone * 3600000) / 1000,
            (Date.parse(res.rslt.results.sunset) + cityObject.timezone * 3600000) / 1000);
        })
        // save the results to a variable
        .subscribe(res => {
          this.dayparameters.push(res);
          console.log(res);

          if (this.dayparameters.length === ud.size) {
            passes.forEach(p => {
              const day = this.dayparameters.find(x => x.date === p.date);
              (p.risetime > day.sunriseTime && p.risetime < day.sunsetTime) ? p.daytime = true : p.daytime = false;
            });
            this.dataSource.data = passes;
            console.log(this.dataSource.data);
          }

        }));
    });
  }

  // is valid for timestamp in seconds only
  getShortDate(timestamp) {
    return new Date(timestamp * 1000).getFullYear() + '-' + (new Date(timestamp * 1000).getMonth() + 1)
      + '-' + new Date(timestamp * 1000).getDate();
  }

}

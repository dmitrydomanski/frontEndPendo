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

  ngOnChanges(changes: SimpleChanges) {
    // reseting the variables for a new request
    this.dataSource.data = new Array<IPass>();
    this.dayparameters = new Array<IDay>();
    if (typeof changes.cityName !== undefined) {
      this.requestData(changes.cityName.currentValue);
    }
  }

  /**
   * Request data from APIs with (city) and fetch the data
   *  to populate dataTable. First request data from ISS, the use this
   *  data to check out if the passtime id day of night.
   * @param city which is basically the name of the selected city
   */
  requestData(city) {

    const cityObject = this.cities.find(c => c.name === city);

    this.dataService.getData(cityObject.lat, cityObject.lng).subscribe(data => {
      this.dataSource.data = data.response.map(pass => {
        return new IPass(this.getShortDate(pass.risetime), (pass.risetime), pass.duration);
      });

      const passes: IPass[] = this.dataSource.data;
      const uniquePassDates = new Set(passes.map(p => p.date));

      uniquePassDates.forEach(uniqueDate => this.dataService.getSunRise(cityObject.lat, cityObject.lng, uniqueDate)
        .map(response => {
          return new IDay(response.date,
            (Date.parse(response.rslt.results.sunrise) + cityObject.timezone * 3600000) / 1000,
            (Date.parse(response.rslt.results.sunset) + cityObject.timezone * 3600000) / 1000);
        })
        .subscribe(res => {
          this.dayparameters.push(res);

          if (this.dayparameters.length === uniquePassDates.size) {
            passes.forEach(pass => {
              const uniqueDay = this.dayparameters.find(day => day.date === pass.date);
              (pass.risetime > uniqueDay.sunriseTime && pass.risetime < uniqueDay.sunsetTime) ? pass.daytime = true : pass.daytime = false;
            });
            this.dataSource.data = passes;
          }
        }));
    });
  }

  /**
   * Transform timestamp in seconds to a format acceptable by sunriseAPI
   * @param timestamp a timestamp in seconds
   */
  getShortDate(timestamp) {
    return new Date(timestamp * 1000).getFullYear() + '-' + (new Date(timestamp * 1000).getMonth() + 1)
      + '-' + new Date(timestamp * 1000).getDate();
  }

}

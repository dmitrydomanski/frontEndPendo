import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ICity } from '../models/city.model';

@Injectable()
export class DataService {

  private issApiUrl = 'http://api.open-notify.org/iss-pass.json?&alt=20&n=10';
  private sunSetApiUrl = 'https://api.sunrise-sunset.org/json?';

  // cities & coordinates from the assignment, hardcoded

  givenCities = [
    ['Tel-Aviv', 32.0853, 34.7818, 0],
    ['London', 51.5074, -0.127, -2],
    ['New-York', 40.7128, -74.006, -7]
  ];

  constructor(private http: Http) { }

  createCity(name: string, lat: number, lng: number, timezone: number): ICity {
    return new ICity(name, lat, lng, timezone);
  }

  // creating citiesArray for select
  createCitiesArray(): ICity[] {
    const cities = new Array<ICity>();
    this.givenCities.forEach(p => cities.push(new ICity(<string>p[0], <number>p[1], <number>p[2],<number>p[3])));
    return cities;
    
  }

  // getting data from API, just the responce property that we'll use for table later
  getData(lat, long) {
    const requestUrl = this.issApiUrl + '&lat=' + lat + '&lon=' + long;
    return this.http.get(requestUrl)
      .map((res: Response) => res.json());
  }

  // getting sunrise time from sunset API
  getSunRise(lat, long, date) {
    const requestUrl = this.sunSetApiUrl + '&lat=' + lat + '&lng=' + long + '&date=' + date + '&formatted=0';
    return this.http.get(requestUrl)
      .map((res: Response) => {
        return { date: date, rslt: res.json() };
      });
  }
}



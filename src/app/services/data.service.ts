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
    ['Tel-Aviv', 32.0853, 34.7818],
    ['London', 51.5074, -0.127],
    ['New-York', 40.7128, -74.006]
  ];

  constructor(private http: Http) { }

  createCity(name: string, lat: number, lng: number) {
    return { name: name, lat: lat, lng: lng };
  }

  // creating citiesArray for select
  createCitiesArray(): ICity[] {
    const cities = this.givenCities.map(city => {
      return new ICity(<string> city[0], <number> city[1], <number> city[2]);
    });
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
    const requestUrl = this.sunSetApiUrl + '&lat=' + lat + '&lng=' + long + '&date=' + date;
    return this.http.get(requestUrl)
      .map((res: Response) => {
        return { date: date, rslt: res.json() };
      });
  }
}



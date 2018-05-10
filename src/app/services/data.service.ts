import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ICity } from '../models/city.model';
import { environment } from '../../environments/environment';
import { CITIES } from '../../definitions/preset-cities';

@Injectable()
export class DataService {

  preSetCities = CITIES;

  constructor(private http: Http) { }

  createCity(name: string, lat: number, lng: number, timezone: number): ICity {
    return new ICity(name, lat, lng, timezone);
  }

  createCitiesArray(): ICity[] {
    const cities = new Array<ICity>();
    this.preSetCities.forEach(p => cities.push(new ICity(<string>p[0], <number>p[1], <number>p[2], <number>p[3])));
    return cities;
  }

/**
 * sends a request to issAPI to get nearest 10 passes with
 *  the details of a selected city
 * @param lat lattitude of a city
 * @param long longitude of a city
 */
  getData(lat, long) {
    const requestUrl = environment.issAPI + '&lat=' + lat + '&lon=' + long;
    return this.http.get(requestUrl)
      .map((res: Response) => res.json());
  }
/**
 * sends a request to sunriseAPI to get
 * the astronomical dimensions of a specific day
 * in a scecific location
 * @param lat lattitude of a city
 * @param long longitude of a city
 * @param date date that we want to ret data for
 */
  getSunRise(lat, long, date) {
    const requestUrl = environment.sunriseAPI + '&lat=' + lat + '&lng=' + long + '&date=' + date + '&formatted=0';
    return this.http.get(requestUrl)
      .map((res: Response) => {
        return { date: date, rslt: res.json() };
      });
  }
}



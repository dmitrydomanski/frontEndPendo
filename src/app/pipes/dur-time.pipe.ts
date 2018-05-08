import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DateConstants } from '../pipes/pipe-const';
import * as moment from 'moment';
import * as momentDurationFormat from 'moment-duration-format';

@Pipe({
  name: 'issDuration'
})

export class DurationPipe implements PipeTransform {

  transform(value: number): any {
    let min = Math.floor(value / 60) >= 10 ? Math.floor(value / 60).toString() : '0' + Math.floor(value / 60).toString();
    let sec = (value % 60) < 10 ? '0' + (value % 60).toFixed(0) : (value % 60).toFixed(0);
    return '00:' + min + ':' + sec;
  }




  //   convertToDur( millsec: number ) {
  //     // 1- Convert to seconds:
  //     let sec = millsec / 1000;
  //     // 2- Extract hours:
  //     let hours = parseInt( sec / 3600 ); // 3,600 seconds in 1 hour
  //     sec = sec % 3600; // seconds remaining after extracting hours
  //     // 3- Extract minutes:
  //     let mmin = parseInt( sec/60 ); // 60 seconds in 1 minute
  //     // 4- Keep only seconds not extracted to minutes:
  //     sec = sec % 60;
  //     return hours+":"+min+":"+sec;
  // }




}




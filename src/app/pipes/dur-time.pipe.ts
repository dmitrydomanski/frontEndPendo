import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DateConstants } from '../pipes/pipe-const';

@Pipe({
  name: 'issDuration'
})

export class DurationPipe implements PipeTransform {

  transform(value: number): any {
    const min = Math.floor(value / 60) >= 10 ? Math.floor(value / 60).toString() : '0' + Math.floor(value / 60).toString();
    const sec = (value % 60) < 10 ? '0' + (value % 60).toFixed(0) : (value % 60).toFixed(0);
    return '00:' + min + ':' + sec;
  }

}




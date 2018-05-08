import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DateConstants } from '../pipes/pipe-const';

@Pipe({
  name: 'issRise'
})
export class RisePipe extends DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return super.transform(new Date(value*1000), DateConstants.RISE);
  }

}

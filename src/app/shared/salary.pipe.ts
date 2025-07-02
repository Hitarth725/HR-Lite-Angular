import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'salary'
})
export class SalaryPipe implements PipeTransform {
 transform(value: number): string {
    return '₹' + new Intl.NumberFormat('en-IN').format(value);
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'desription',
  standalone: true
})
export class DesriptionPipe implements PipeTransform {

  transform(value: string, count: number): string {
    return value.split(' ').slice(0,count).join(' ');
  }
}

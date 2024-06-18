import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'base64ToImage',
  standalone: true
})
export class Base64ToImagePipe implements PipeTransform {

  transform(base64String: string): string {
    return `data:image/jpeg;base64,${base64String}`;
  }

}

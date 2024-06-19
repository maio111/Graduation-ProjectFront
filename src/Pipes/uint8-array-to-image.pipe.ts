import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uint8ArrayToImage',
  standalone: true
})
export class Uint8ArrayToImagePipe implements PipeTransform {

  transform(uint8Array: Uint8Array): string {
    if (!uint8Array || uint8Array.length === 0) {
      return '';
    }
    const base64String = this.arrayBufferToBase64(uint8Array);
    return `data:image/jpeg;base64,${base64String}`;
  }

  private arrayBufferToBase64(buffer: Uint8Array): string {
    let binary = '';
    buffer.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    return window.btoa(binary);
  }

}

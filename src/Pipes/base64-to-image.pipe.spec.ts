import { Base64ToImagePipe } from './base64-to-image.pipe';

describe('Base64ToImagePipe', () => {
  it('create an instance', () => {
    const pipe = new Base64ToImagePipe();
    expect(pipe).toBeTruthy();
  });
});

import { Uint8ArrayToImagePipe } from './uint8-array-to-image.pipe';

describe('Uint8ArrayToImagePipe', () => {
  it('create an instance', () => {
    const pipe = new Uint8ArrayToImagePipe();
    expect(pipe).toBeTruthy();
  });
});

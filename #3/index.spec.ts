import logest from '.';
import { expect } from 'chai';

describe('1-dimensional LOGEST function', () => {
  it('should return NaN, given all zero values', () => {
    const known_y: number[] = [0, 0, 0, 0, 0];
    expect(logest(known_y)).to.be.NaN;
  });

  it('should return NaN, given all negative values', () => {
    const known_y: number[] = [-5, -4, -3, -2, -1];
    expect(logest(known_y)).to.be.NaN;
  });

  it('should return NaN, given one zero value', () => {
    const known_y: number[] = [5, 4, 0, 2, 1];
    expect(logest(known_y)).to.be.NaN;
  });

  it('should return NaN, given one negative value', () => {
    const known_y: number[] = [5, -4, 3, 2, 1];
    expect(logest(known_y)).to.be.NaN;
  });

  it('should return the logarithmic curve rate, given positive values', () => {
    const known_y: number[] = [5, 4, 3, 2, 1];
    expect(logest(known_y)).to.be.approximately(0.6762433378062416, 0.0001);
  });
});

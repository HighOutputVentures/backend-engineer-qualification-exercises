import logest from '.';
import { expect } from 'chai';

describe('1-dimensional LOGEST function', () => {
  it('should return NaN, given all zero values', () => {
    const ys = [0, 0, 0, 0, 0];
    expect(logest(ys)).to.be.NaN;
  });

  it('should return NaN, given all negative values', () => {
    const ys: number[] = [-5, -4, -3, -2, -1];
    expect(logest(ys)).to.be.NaN;
  });

  it('should return NaN, given one zero value', () => {
    const ys: number[] = [5, 4, 0, 2, 1];
    expect(logest(ys)).to.be.NaN;
  });

  it('should return NaN, given one negative value', () => {
    const ys: number[] = [5, -4, 3, 2, 1];
    expect(logest(ys)).to.be.NaN;
  });

  it('should return the logarithmic curve rate, given positive values', () => {
    const ys: number[] = [5, 4, 3, 2, 1];
    expect(logest(ys)).to.be.approximately(0.6762433378062416, 0.001);
  });
});

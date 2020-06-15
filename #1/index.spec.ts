import delay from '@highoutput/delay';
import sinon from 'sinon';
import { expect } from 'chai';
import R from 'ramda';
import AsyncCache from '.';

describe('AsyncCache', () => {
  before(function () {
    this.spy = sinon.spy(async (first: any, second: any) => {
      await delay(100 + Math.random() * 100);

      let result: Record<string, any> = {
        first
      };

      if (!R.isNil(second)) {
        result = {
          ...result,
          second,
        };
      }

      return result;
    });
  });

  beforeEach(function () {
    sinon.reset();
  });

  it('should call the handler once, when #exec is called multiple times in series', async function () {
    const cache = new AsyncCache<[string], { first: string }>(this.spy);

    await cache.exec('hello').then(result => expect(result).to.deep.equal({ first: 'hello' }));
    await cache.exec('hello').then(result => expect(result).to.deep.equal({ first: 'hello' }));

    expect(this.spy.calledOnce).to.be.true;
  });

  it('should call the handler once, when #exec is called multiple times in parallel', async function () {
    const cache = new AsyncCache<[string], { first: string }>(this.spy);

    await Promise.all([
      cache.exec('hello').then(result => expect(result).to.deep.equal({ first: 'hello' })),
      cache.exec('hello').then(result => expect(result).to.deep.equal({ first: 'hello' })),
    ]);

    expect(this.spy.calledOnce).to.be.true;
  });

  it('should call the handler multiple times, when #exec is called multiple times in parallel with different inputs', async function () {
    const cache = new AsyncCache<[string], { first: string }>(this.spy);

    await Promise.all([
      cache.exec('hello').then(result => expect(result).to.deep.equal({ first: 'hello' })),
      cache.exec('world').then(result => expect(result).to.deep.equal({ first: 'world' })),
      cache.exec('everybody').then(result => expect(result).to.deep.equal({ first: 'everybody' })),
    ]);

    expect(this.spy.callCount).to.equal(3);
  });

  it('should call the handler once, when #exec is called multiple times in series with the same complex input', async function () {
    const cache = new AsyncCache<[{ message: string }, number], { first: { message: string }, second: number }>(this.spy);

    await cache.exec({ message: 'hello' }, 5).then(result => expect(result).to.deep.equal({ first: { message: 'hello' }, second: 5 }));
    await cache.exec({ message: 'hello' }, 5).then(result => expect(result).to.deep.equal({ first: { message: 'hello' }, second: 5 }));

    expect(this.spy.calledOnce).to.be.true;
  });

  it('should call the handler multiple times, when #exec is called multiple times in series with different complex inputs', async function () {
    const cache = new AsyncCache<[{ message: string }, number], { first: { message: string }, second: number }>(this.spy);

    await cache.exec({ message: 'hello' }, 10).then(result => expect(result).to.deep.equal({ first: { message: 'hello' }, second: 10 }));
    await cache.exec({ message: 'world' }, 5).then(result => expect(result).to.deep.equal({ first: { message: 'world' }, second: 5 }));

    expect(this.spy.callCount).to.equal(2);
  });

  it('should call the handler multiple times, when #exec is called multiple times in series with a delay in between calls', async function () {
    const cache = new AsyncCache<[string], { first: string }>(this.spy, 500);

    await cache.exec('hello').then(result => expect(result).to.deep.equal({ first: 'hello' }));
    await delay(600);
    await cache.exec('hello').then(result => expect(result).to.deep.equal({ first: 'hello' }));

    expect(this.spy.callCount).to.equal(2);
  });
});
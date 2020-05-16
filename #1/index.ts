export default class<TInput extends Array<any> = Array<any>, TOutput = any> {
  constructor(private handler: (...args: TInput) => Promise<TOutput>, private timeout?: number) {
    // do something
  }

  async exec(...args: TInput): Promise<TOutput> {
    // do something
    return {} as TOutput;
  }
}

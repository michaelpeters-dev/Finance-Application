declare module "timeseries-analysis" {
  export default class TimeSeries {
    constructor(data?: any[]);
    init(data: any[]): this;
    slr(): this;
    ar(): this;
    ma(): this;
    min(): number;
    max(): number;
    mean(): number;
    stdev(): number;
    smoother(opts?: { period: number }): this;
    ARMaxEntropy(opts?: { degree: number }): this;
    forecast(n: number): { output: [number, number][] };
  }
}

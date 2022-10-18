export const xMin = 100,
  xMax = 1600;

const calculate = (russian: boolean, point: number) => {
  const m = russian ? -0.2136691176 : -0.237035714285714,
    b = russian ? 1141.7215 : 1001.46547619048;

  const x = point;
  if (x >= xMin && x <= xMax) {
    return Math.round(m * x + b);
  } else {
    throw new DistanceError();
  }
};

export class DistanceError extends Error {
  constructor() {
    const message = `Enter a distance between ${xMin} and ${xMax} meters`;
    super(message);
    this.name = "DistanceError";
  }
}

export default calculate

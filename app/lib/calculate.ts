export const xMin = 100,
  xMax = 1600;

type Options = {
  m: number;
  b: number;
};

const calculate = (x: number, options: Options) => {
  const { m, b } = options;
  if (x >= xMin && x <= xMax) {
    return Math.round(m * x + b);
  } else {
    throw new DistanceError();
  }
};

export const options = {
  russian: {
    m: -0.2136691176,
    b: 1141.7215,
  },
  // allies and german
  german: {
    m: -0.237035714285714,
    b: 1001.46547619048,
  },
  british: {
    m: -0.1773,
    b: 550.69,
  },
};

export class DistanceError extends Error {
  constructor() {
    const message = `Enter a distance between ${xMin} and ${xMax} meters`;
    super(message);
    this.name = "DistanceError";
  }
}

export default calculate;

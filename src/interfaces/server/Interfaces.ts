interface IPlayer {
  name: string;
  position: {
    x: number;
    y: number;
  };
  bomba: {
    power: string;
    position: {
      x: string;
      y: string;
    };
    time: Date;
  };
}

interface IMap {
  block_destroy: Array<{ x: number; y: number }>;
  block_solid: Array<{ x: number; y: number }>;
}

interface IChat {
  msg: string;
  name: string;
}

export { IPlayer, IMap, IChat };

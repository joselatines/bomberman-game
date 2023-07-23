interface player {
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

interface map {
  block_destroy: Array<{ x: number; y: number }>;
  block_solid: Array<{ x: number; y: number }>;
}

interface chat {
  msg: string;
  name: string;
}

export { player, map, chat };

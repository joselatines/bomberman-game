import * as style from '../styles/block.styles.js'

const {Bodies} = Matter;

class Map {
  #size;
  constructor(size = 65) { this.#size = size; }

  create() {
    const map = [];

    for (let i = 0; i <= 19; i++) {
      if (i == 1 || i == 19)
        continue;

      for (let j = 0; j <= 10; j++) {
        if (j % 2 == 0 || i % 2 == 0) {
          if ((i == 2 || i == 3) && (j == 0 || j == 1))
            continue;
          if ((i == 18 || i == 17) && (j == 0 || j == 1))
            continue;
          if ((i == 2 || i == 3) && (j == 10 || j == 9))
            continue;
          if ((i == 18 || i == 17) && (j == 10 || j == 9))
            continue;
          map.push(Bodies.rectangle(this.#size * i - 67, this.#size * j + 60,
                                    this.#size, this.#size,
                                    {isStatic : true, ...style.block_destroy}))
          continue;
        }
        map.push(Bodies.rectangle(this.#size * i - 67, this.#size * j + 60,
                                  this.#size, this.#size,
                                  {isStatic : true, ...style.block_solid}))
      }
    }

    return map;
  }
}

export default Map;

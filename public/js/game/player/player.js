class Player {
  #engine;
  #render;
  #Body;
  #Bodies;
  #Events;
  #world_padding;
  #player;
  #step;
  #move;

  constructor(engine, render) {
    this.#engine = engine;
    this.#render = render;

    this.#Body = Matter.Body;
    this.#Bodies = Matter.Bodies;
    this.#Events = Matter.Events;
    this.#step = 10;

    this.#world_padding = 300;
    this.#player = this.#Bodies.circle(50, 50, 32.5, { friction: 0, airFriction: 1, inertia: Infinity });
  }

  getPlayer() {
    return this.#player;
  }

  start_keyboard() {

    document.onkeyup = (event) => {
      this.#Body.setVelocity(this.#player, {x:0, y:0});
    }

    document.onkeydown = (event) => {
      if (event.key == 'a') this.#Body.setVelocity(this.#player, {x:-this.#step, y:0});
      if (event.key == 'd') this.#Body.setVelocity(this.#player, {x:this.#step, y:0});
      if (event.key == 'w') this.#Body.setVelocity(this.#player, {x:0, y:-this.#step});
      if (event.key == 's') this.#Body.setVelocity(this.#player, {x:0, y:this.#step});
    };

  }

};

export default Player;
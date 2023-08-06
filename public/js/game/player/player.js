import * as socket from '../../socket.io/socket.js'

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
  #position;

  constructor(engine, render, {x=50, y=50}) {
    this.#engine = engine;
    this.#render = render;

    this.#Body = Matter.Body;
    this.#Bodies = Matter.Bodies;
    this.#Events = Matter.Events;
    this.#step = 5;
    this.#position = {x : -1, y : -1};

    this.#world_padding = 300;
    this.#player = this.#Bodies.circle(
        x, y, 25, {friction : 1, airFriction : 1, inertia : Infinity});
  }

  getPlayer() { return this.#player; }

  start_keyboard() {

    document.onkeyup =
        (event) => { this.#Body.setVelocity(this.#player, {x : 0, y : 0}); }

                   document.onkeydown = (event) => {
          if (event.key == 'a')
            this.#Body.setVelocity(this.#player, {x : -this.#step, y : 0});
          if (event.key == 'd')
            this.#Body.setVelocity(this.#player, {x : this.#step, y : 0});
          if (event.key == 'w')
            this.#Body.setVelocity(this.#player, {x : 0, y : -this.#step});
          if (event.key == 's')
            this.#Body.setVelocity(this.#player, {x : 0, y : this.#step});

          if (!(this.#position.x === this.#player.position.x.toFixed(2) &&
                this.#position.y === this.#player.position.y.toFixed(2))) {
            this.#position.x = this.#player.position.x.toFixed(2);
            this.#position.y = this.#player.position.y.toFixed(2);
            socket.move(this.#position);
          }
        };
  }
};

export default Player;

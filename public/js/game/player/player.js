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

  constructor(engine, render, {x=50, y=50}, mainPlayer=false) {
    this.#engine = engine;
    this.#render = render;

    this.#Body = Matter.Body;
    this.#Bodies = Matter.Bodies;
    this.#Events = Matter.Events;
    this.#step = 5;
    
    this.#position = {x, y};

    this.#world_padding = 300;
    this.#player = this.#Bodies.circle(
        x, y, 25, {isStatic: !mainPlayer, friction : 1, airFriction : 1, inertia : Infinity});

    if(mainPlayer) this.start_keyboard();
    
  }

  getPlayer() { return this.#player; }

  #socketMove() {
    if(this.#player.speed > 0) {
      socket.move(this.#player.position);
    }    
  }

  start_keyboard() {

    setInterval(() => {this.#socketMove();}, 200);

    document.onkeyup = (event) => {
      this.#Body.setVelocity(this.#player, {x : 0, y : 0});
      socket.move(this.#player.position);
    }

    document.onkeydown = (event) => {
      if(!['a', 'd', 'w', 's'].includes(event.key)) return;
      if (event.key == 'a')
        this.#Body.setVelocity(this.#player, {x : -this.#step, y : 0});
      else if (event.key == 'd')
        this.#Body.setVelocity(this.#player, {x : this.#step, y : 0});
      else if (event.key == 'w')
        this.#Body.setVelocity(this.#player, {x : 0, y : -this.#step});
      else if (event.key == 's')
        this.#Body.setVelocity(this.#player, {x : 0, y : this.#step});
    };
  }
};

export default Player;

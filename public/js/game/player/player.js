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
  #sendPayload;
  #timeForAFK;
  #clearStopSendPayload;

  constructor(engine, render, {x=50, y=50}, mainPlayer=false) {
    this.#engine = engine;
    this.#render = render;

    this.#Body = Matter.Body;
    this.#Bodies = Matter.Bodies;
    this.#Events = Matter.Events;
    this.#step = 5;
    this.#position = {x : -1, y : -1};
    this.#timeForAFK = 1000;
    this.#sendPayload = setInterval(() => {
      socket.move(this.#position);
    }, 100);


    this.#world_padding = 300;
    this.#player = this.#Bodies.circle(
        x, y, 25, {isStatic: !mainPlayer, friction : 1, airFriction : 1, inertia : Infinity});

    if(mainPlayer) this.start_keyboard();
    
  }

  getPlayer() { return this.#player; }

  #startSendPayload() {
    if(!this.#sendPayload?._destroyed) {
      clearTimeout(this.#clearStopSendPayload);
      return;
    }
    
    this.#sendPayload = setInterval(() => {
      socket.move(this.#position);
    }, 100);
  }

  #stopSendPayload() {
    this.#clearStopSendPayload = setTimeout(() => {
      clearInterval(this.#sendPayload);
      this.#sendPayload = false;
    }, this.#timeForAFK);
  }

  start_keyboard() {

    document.onkeyup = (event) => {
      this.#Body.setVelocity(this.#player, {x : 0, y : 0});
      this.#stopSendPayload();
    }


    document.onkeydown = (event) => {
      if(!['a', 'd', 'w', 's'].includes(event.key)) return;

      this.#startSendPayload();

      if (event.key == 'a')
        this.#Body.setVelocity(this.#player, {x : -this.#step, y : 0});
      else if (event.key == 'd')
        this.#Body.setVelocity(this.#player, {x : this.#step, y : 0});
      else if (event.key == 'w')
        this.#Body.setVelocity(this.#player, {x : 0, y : -this.#step});
      else if (event.key == 's')
        this.#Body.setVelocity(this.#player, {x : 0, y : this.#step});

      if (!(this.#position.x === this.#player.position.x.toFixed(2) &&
            this.#position.y === this.#player.position.y.toFixed(2))) {
        this.#position.x = this.#player.position.x.toFixed(2);
        this.#position.y = this.#player.position.y.toFixed(2);  
      }
    };
  }
};

export default Player;

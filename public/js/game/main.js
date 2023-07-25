import Player from './player/player.js'
import Map from './map/map.js'
import * as style from './styles/block.styles.js'
import * as socket from '../socket.io/socket.js'

// module aliases
const { Engine, Render, Runner, Bodies, Body, Composite, Vector, World } = Matter;

// create an engine
const engine = Engine.create({ gravity: { y: 0, x:0 } });
const canvas = document.querySelector('#content-game');
const width = 1165;
const height = 770;

// create a renderer
const render = Render.create({
  element:  document.querySelector('#content-game'),
  engine: engine,
  options: {
		width,
		height,
		wireframes: false,
		background: 'green'
	},
});

const scene = [...new Map().create()];

//walls
scene.push(
	//up
	Bodies.rectangle(width/2, 10, width, 33, { isStatic: true, ...style.metal}),
	//down
	Bodies.rectangle(width/2, height-10, width, 33, { isStatic: true, ...style.metal }),

	//left
	Bodies.rectangle(10, height/2, 33, height, { isStatic: true, ...style.metal }),
	//right
	Bodies.rectangle(width-10, height/2, 33, height, { isStatic: true, ...style.metal }),

);


const __player__ = new Player(engine, render);
__player__.start_keyboard();

const player = __player__.getPlayer();

scene.push(player);



// add all of the bodies to the world
World.add(engine.world, scene);
Render.run(render);

const runner = Runner.create();

// run the engine
Runner.run(runner, engine);
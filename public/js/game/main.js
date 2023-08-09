import Player from './player/player.js'
import Map from './map/map.js'
import * as style from './styles/block.styles.js'
import * as socket from '../socket.io/socket.js'

const getPosition = (position) => {
	const x = position >= 1 && position <= 2?1106:58;
	const y = position >= 2 && position <= 3?711:58;
	
	return {x, y};
}

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


const player = new Player(engine, render, getPosition(positionPlayer), true).getPlayer();

[0,1,2,3].forEach(e => {
	if(e!==positionPlayer) {
		online[`player${e}`] = new Player(engine, render, getPosition(e)).getPlayer();
		return;
	}

	online[`player${positionPlayer}`] = player;
});

scene.push(...Object.values(online));

// add all of the bodies to the world
World.add(engine.world, scene);
Render.run(render);

const runner = Runner.create();

// run the engine
Runner.run(runner, engine);

// export {online}
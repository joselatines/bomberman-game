const position = (payload) => {
	if(positionPlayer !== payload.positionPlayer) {
		let {x, y} = online[`player${payload.positionPlayer}`].position;

		if(globalThis.animation !== undefined) clearInterval(globalThis.animation);

		globalThis.animation = setInterval(() => {
			if(
				(x>=payload.x-5 && x<=payload.x+5) &&
				(y>=payload.y-5 && y<=payload.y+5)
			) {
				Matter.Body.setPosition(online[`player${payload.positionPlayer}`], {x: payload.x, y: payload.y});
				return clearInterval(globalThis.animation);
			}

			if(!(x>=payload.x-5 && x<=payload.x+5)) {x>payload.x?x-=5:x+=5;}
			if(!(y>=payload.y-5 && y<=payload.y+5)) {y>payload.y?y-=5:y+=5;}

			Matter.Body.setPosition(online[`player${payload.positionPlayer}`], {x, y});
		}, 1000 / 60);
	}
}

export default position;
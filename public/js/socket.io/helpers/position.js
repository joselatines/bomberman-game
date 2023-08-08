const position = (payload) => {
	console.log(payload);
	
	if(positionPlayer !== payload.positionPlayer) {
		Matter.Body.setPosition(online[`player${payload.positionPlayer}`], {x: payload.x, y: payload.y});
	}
}

export default position;
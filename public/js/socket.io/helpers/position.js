const position = (payload, index) => {
	console.log(payload);
	console.log(`player${index}`);
	if(positionPlayer !== index) Matter.Body.setPosition(online[`player${index}`], payload[1]);
}

export default position;
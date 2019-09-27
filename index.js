let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let p = new Player(400, 100);
let g = new Ground("assets/ground.png", 0, 100, 35);

let prevTime = 0;
function gameLoop(timestamp) {
	let dt = timestamp - prevTime;
	prevTime = timestamp;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	let position = g.getFloor(p.position.x, 5, 1);
	p.ground = position.y;
	if (p.state != state.JUMPING)
		p.rotation = position.a;
	p.update(dt);
	p.draw(ctx);

	g.draw(ctx);

	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

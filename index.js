let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let p = new Player(400, 400);

let prevTime = 0;
function gameLoop(timestamp) {
	let dt = timestamp - prevTime;
	prevTime = timestamp;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	p.update(dt);
	p.draw(ctx);

	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
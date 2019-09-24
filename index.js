let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');

let p = new Player(50, 50, canvas.height);

let prevTime = 0;
function gameLoop(time) {
	let dt = time - prevTime;
	prevTime = time;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	p.update(dt);
	p.draw(ctx);

	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

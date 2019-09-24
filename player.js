function Player (x, y) {
	this.position = {
		x : x,
		y : y
	}
	this.width = 50;
	this.height = 50;

	this.speed = 100;

	this.draw = function(ctx) {
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	}

	this.update = function(dt) {
		if (inputMap.left) {
			this.position.x -= this.speed / dt;
		}

		if (inputMap.right) {
			this.position.x += this.speed / dt;
		}
	}
}

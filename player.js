function Player (x, y, height) {
	this.size = {
		width : 50,
		height: 50
	}

	this.color = '#000';

	this.position = {
		x : x,
		y : y
	}

	this.speed = 100;
	this.ground = height - this.size.height/2;
	this.grav = 0;
	this.jumpHeight = 20;

	this.update = function(dt) {
		if (inputMap.left) 
			this.position.x -= this.speed / dt; 

		if (inputMap.right) 
			this.position.x += this.speed / dt;

		this.position.y += this.grav;
		if (this.position.y < this.ground) {
			this.grav += 20 / dt;
		} else {
			this.position.y = this.ground;
			this.grav = 0;
		}

		if (inputMap.jump && this.position.y == this.ground) {
			this.jump();
		}
	}

	this.jump = function() {
		this.grav = -this.jumpHeight;
	}

	this.draw = function(ctx) {
		ctx.fillStyle = this.color;
		ctx.fillRect(
			this.position.x - this.size.width / 2, 
			this.position.y - this.size.height / 2, 
			this.size.width, this.size.height
		);
	}
}
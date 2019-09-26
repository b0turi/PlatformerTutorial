var state = {
	IDLE : 0,
	RUNNING : 1,
	JUMPING : 2
}

function Player(x, y) {
	this.position = {
		x : x,
		y : y
	};
	this.width = 50;
	this.height = 50;

	this.speed = 100;
	this.gravity = 15;
	this.velocity = {
		x : 0,
		y : 0
	};
	this.ground = 425;
	this.jumpForce = -20;
	this.state = state.IDLE;

	this.draw = function(ctx) {
		ctx.fillRect(this.position.x - this.width/2, this.position.y - this.height/2, this.width, this.height);
	}

	this.update = function(dt) {
		this.velocity.x = 0;
		console.log(this.state);

		let onGround = (this.position.y == this.ground);
		if (inputMap.left) {
			this.velocity.x -= this.speed / dt;
			if (onGround)
				this.state = state.RUNNING;
		}

		if (inputMap.right) {
			this.velocity.x += this.speed / dt;
			if (onGround)
				this.state = state.RUNNING;
		}

		this.velocity.y += this.gravity / dt;

		this.position = vectorAdd(this.velocity, this.position);

		if (this.position.y > this.ground) {
			this.position.y = this.ground;
			if (this.velocity.x == 0)
				this.state = state.IDLE;
		} else {
			this.state = state.JUMPING;
		}

		if(inputMap.jump && this.state != state.JUMPING) {
			this.jump();
		}
	}

	this.jump = function() {
		this.velocity.y = this.jumpForce;
	}
}
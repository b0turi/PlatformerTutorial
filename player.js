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
	this.inputForce = 0;
	this.ground = 425;
	this.jumpForce = -20;
	this.state = state.IDLE;
	this.rotation = -5 * (Math.PI / 180);

	this.draw = function(ctx) {
		ctx.save();
		ctx.translate(this.position.x - this.velocity.x, this.position.y + this.height/2);
		ctx.rotate(this.rotation);
		ctx.translate(0, -this.height/2)
		ctx.fillStyle = 'red';
		ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
		ctx.restore();
	}

	this.update = function(dt) {
		this.inputForce = 0;

		let onGround = (this.position.y == this.ground);
		if (inputMap.left) {
			this.inputForce -= this.speed / dt;
			if (onGround)
				this.state = state.RUNNING;
		}

		if (inputMap.right) {
			this.inputForce += this.speed / dt;
			if (onGround)
				this.state = state.RUNNING;
		}

		this.velocity.x = this.inputForce + 5;
		this.velocity.y += this.gravity / dt;

		this.position = vectorAdd(this.velocity, this.position);

		if(inputMap.jump && this.state != state.JUMPING) {
			this.jump();
		}

		if (this.position.y > this.ground - this.height/2) {
			this.position.y = this.ground - this.height/2;
			if (this.state != state.RUNNING)
				this.state = state.IDLE;
		}
	}

	this.jump = function() {
		this.velocity.y = this.jumpForce;
		this.state = state.JUMPING;
	}
}

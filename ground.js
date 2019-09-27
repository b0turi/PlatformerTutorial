function isGround(data, width, x, y) {
	let pixelIndex = (width * y + x) * 4;
    // Index + 3 = alpha channel of the given pixel
	return (data[pixelIndex + 3] != 0);
}

function Ground(imgName, x, y, numSamples = 2) {
    this.position = {
        x : x,
        y : y
    };

    this.width = 0;
    this.height = 0;
    this.segmentSize = 0;
	this.numSamples = numSamples;

    this.terrainPoints = [];

    let ground = this;
    this.img = new Image();
    this.img.src = imgName;
    this.img.onload = function() {
        let tempCanvas = document.createElement("canvas");
        let tempCtx = tempCanvas.getContext("2d");

        ground.width = this.width;
        ground.height =  this.height;

        tempCanvas.width = this.width;
    	tempCanvas.height = this.height;
    	tempCtx.drawImage(this, 0, 0);

    	let data = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height).data;

        let sampleRate = Math.floor(this.width / (numSamples - 1));
        ground.segmentSize = sampleRate;

		let x, y = 0;
    	for(x = 0; x < tempCanvas.width; x += sampleRate) {
			y = 0;
    		while (!isGround(data, tempCanvas.width, x, y)) {
    			y++;
    		}
    		ground.terrainPoints.push(y);
    	}

		x = tempCanvas.width - 1;
		y = 0;
		while (!isGround(data, tempCanvas.width, x, y)) {
			y ++;
		}
		ground.terrainPoints.push(y);

    }

	this.getAngle = function(a, b) {
		return Math.atan2(this.terrainPoints[b] - this.terrainPoints[a], this.segmentSize * (b - a));
	}

    this.getFloor = function(x, padding, smoothing) {
        let relativeX = x - this.position.x;
        if (relativeX < 0) {
            return { y : this.position.y + this.terrainPoints[0], a : 0 }
		}

		if (relativeX > this.width) {
            return { y : this.position.y + this.terrainPoints[this.numSamples], a : 0 }
		}

        let lowerBound = Math.floor(relativeX / this.segmentSize);
        let upperBound = Math.ceil(relativeX / this.segmentSize);

		let angle = this.getAngle(lowerBound, upperBound);
		let otherAngle = angle;

		let difference = this.terrainPoints[upperBound] - this.terrainPoints[lowerBound];
		let distanceAcross = relativeX - (lowerBound * this.segmentSize);
		let progress = distanceAcross / this.segmentSize;

		if (distanceAcross >= this.segmentSize / 2) {
			otherAngle = this.getAngle(upperBound, upperBound + 1);
			angle = angle + ((progress - 0.5) * (otherAngle - angle)) * (smoothing > 1 ? 1 : smoothing < 0 ? 0 : smoothing);
		} else if (distanceAcross < this.segmentSize / 2){
			otherAngle = this.getAngle(lowerBound - 1, lowerBound);
			angle = angle - ((0.5 - progress) * (angle - otherAngle)) * (smoothing > 1 ? 1 : smoothing < 0 ? 0 : smoothing);
		}

        return {
			y : this.position.y + this.terrainPoints[lowerBound] + (difference * progress) + padding,
			a : angle
		}
    }

	this.draw = function(ctx) {
		// Normal draw
		ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);

		// Draw terrain points
		// ctx.fillStyle = "rgba(30, 100, 30, 10)";
		// ctx.moveTo(this.position.x, this.position.y + this.terrainPoints[0]);
		// for(let i = 1; i < this.terrainPoints.length; i++) {
		// 	ctx.lineTo(i * this.segmentSize, this.position.y + this.terrainPoints[i]);
		// }
		// ctx.lineTo(this.position.x + this.width, this.position.y + this.height);
		// ctx.lineTo(this.position.x, this.position.y + this.height);
		// ctx.lineTo(this.position.x, this.position.y + this.terrainPoints[0]);
		// ctx.fill();
	}
}

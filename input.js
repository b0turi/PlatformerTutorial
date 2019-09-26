var inputMap = {
	left : false,
	right : false,
	jump : false
};

let keyBindings = {
	37 : 'left',
	39 : 'right',
	32 : 'jump'
};

window.addEventListener('keydown', function(e) {
	inputMap[keyBindings[e.keyCode]] = true;
});

window.addEventListener('keyup', function(e) {
	inputMap[keyBindings[e.keyCode]] = false;
});

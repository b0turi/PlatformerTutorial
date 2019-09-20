var inputMap = {
	left : false,
	right: false,
	jump : false
}

let keyBindings = {
	65 : 'left',
	68 : 'right',
	87 : 'jump'
}

window.addEventListener('keydown', function(e) { 
	inputMap[keyBindings[e.keyCode]] = true;
});

window.addEventListener('keyup', function(e) { 
	inputMap[keyBindings[e.keyCode]] = false;
});
(function () {
"use strict";

var parser = math.parser(),
	logElement = document.getElementById('log'),
	logArea = document.getElementById('log-area'),
	inputArea = document.getElementById('input-area');

function evaluate (expr) {
	var res;
	try {
		res = parser.eval(expr);
		parser.set('ans', res);
		res = math.format(res);
	} catch (e) {
		res = e.toString();
	}
	return res;
}

function log (input, output) {
	var node;

	input = document.createTextNode(input);
	node = document.createElement('dt');
	node.appendChild(input);
	logElement.appendChild(node);

	output = document.createTextNode(output);
	node = document.createElement('dd');
	node.appendChild(output);
	logElement.appendChild(node);
}

function exec (input) {
	if (input) {
		log(input, evaluate(input));
	} else {
		logElement.innerHTML = '';
	}
}

function updateLayout () {
	setTimeout(function () {
		logArea.style.paddingBottom = window.getComputedStyle(inputArea).height;
		logElement.scrollIntoView(false);
	}, 0);
}

function init () {
	var input = new Input(document.getElementById('input')),
		keyboard = new Keyboard(document.getElementById('keyboard'), input, exec);
	keyboard.onLayoutChange = updateLayout;
	keyboard.show();

	parser.set('about', function () {
		return {
			toString: function () {
				return [
					'Calculator',
					'This is an advanced calculator. It allows you to write expressions in natural syntax and to evaluate them.',
					'You can reach almost all functions directly from the integrated virtual keyboard. Note that it also has a way to enter any letter, and to use your native keyboard.',
					'Your input and the output will show up on the main screen, and you can use the arrow keys to reuse your previous entries. Submit an empty input to clear the screen.',
					'To get help on a function, just use the "help" function with the name of the function you want to learn about (without the parenthesis). You can also read the online help on http://mathjs.org/docs/index.html (since that library is used internally).',
					'This app is free software, you can download it from https://github.com/Schnark/math and use it according to the terms of the Apache License. Internally, it uses math.js, see https://github.com/josdejong/mathjs for details.'
				].join('\n');
			}
		};
	});
}

init();

})();
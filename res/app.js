/*global math, Input, Keyboard*/
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
		if (res === undefined) {
			res = 'undefined';
		} else if (!res.toHtml) {
			parser.set('ans', res);
			res = math.format(res);
		}
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

	node = document.createElement('dd');
	if (output.toHtml) {
		node.innerHTML = output.toHtml();
	} else {
		output = document.createTextNode(output);
		node.appendChild(output);
	}
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
}

init();

})();
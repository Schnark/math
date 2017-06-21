/*global math*/
(function () {
"use strict";

var oldHelp = math.help;

function about () {
	return {
		toString: function () {
			return [
				//jscs:disable maximumLineLength
				'Calculator',
				'This is an advanced calculator. It allows you to write expressions in natural syntax and to evaluate them.',
				'You can reach almost all functions directly from the integrated virtual keyboard. Note that it also has a way to enter any letter, and to use your native keyboard.',
				'Your input and the output will show up on the main screen, and you can use the arrow keys to reuse your previous entries. Submit an empty input to clear the screen.',
				'To get help on a function, just use the "help" function with the name of the function you want to learn about (without the parenthesis). You can also read the online help on http://mathjs.org/docs/index.html (since that library is used internally).',
				'Additionally, this app includes three functions to plot graphs. Just enter "plotCartesian(x^2, x, -3, 3)" to try it. You can also pass an array of functions, add a step parameter as fith one, and plot polar and parametric functions.',
				'This app is free software, you can download it from https://github.com/Schnark/math and use it according to the terms of the Apache License. Internally, it uses math.js, see https://github.com/josdejong/mathjs for details.'
				//jscs:enable maximumLineLength
			].join('\n');
		}
	};
}

function help (topic) {
	var internal = {
			plotCartesian: {
				name: 'plotCartesian',
				category: 'Plot',
				syntax: [
					'plotCartesian(f(x), x, start, end)',
					'plotCartesian(f(x), x, start, end, step)',
					'plotCartesian([f1(x), f2(x)], x, start, end)',
					'plotCartesian([f1(x), f2(x)], x, start, end, step)'
				],
				description: 'Plot one or more functions in a cartesian coordinate system',
				/*examples: [
					'plotCartesian(x^2, x, -3, 3)'
				],*/
				seealso: [
					'plotPolar',
					'plotParametric'
				]
			},
			plotPolar: {
				name: 'plotPolar',
				category: 'Plot',
				syntax: [
					'plotPolar(r(phi), phi, start, end)',
					'plotPolar(r(phi), phi, start, end, step)',
					'plotPolar([r1(phi), r2(phi)], phi, start, end)',
					'plotPolar([r1(phi), r2(phi)], phi, start, end, step)'
				],
				description: 'Plot one or more functions in a polar coordinate system',
				/*examples: [
					'plotPolar(cos(5phi), phi, 0, 4pi)'
				],*/
				seealso: [
					'plotCartesian',
					'plotParametric'
				]
			},
			plotParametric: {
				name: 'plotParametric',
				category: 'Plot',
				syntax: [
					'plotParametric(f(t), g(t), t, start, end)',
					'plotParametric(f(t), g(t), t, start, end, step)',
					'plotParametric([f1(t), f2(t)], [g1(t), g2(t)], t, start, end)',
					'plotParametric([f1(t), f2(t)], [g1(t), g2(t)], t, start, end, step)'
				],
				description: 'Plot one or more function pairs in a cartesian coordinate system',
				/*examples: [
					'plotParametric(t^2, t, t, -3, 3)'
				],*/
				seealso: [
					'plotCartesian',
					'plotPolar'
				]
			}
		},
		alias = {
			'+': 'add',
			'-': 'subtract',
			'*': 'multiply',
			'/': 'divide',
			'^': 'pow',
			'.*': 'dotMultiply',
			'./': 'dotDivide',
			'.^': 'dotPow',
			'&': 'bitAnd',
			'|': 'bitOr',
			'~': 'bitNot',
			'<<': 'leftShift',
			'>>': 'rightArithShift',
			'>>>': 'rightLogShift',
			'==': 'equal',
			'!=': 'unequal',
			'>': 'larger',
			'>=': 'largerEq',
			'<': 'smaller',
			'<=': 'smallerEq',
			'%': 'mod',
			':': 'range',
			'[': 'matrix'
		};
	if (internal[topic]) {
		return new math.type.Help(internal[topic]);
	} else if (alias[topic]) {
		return oldHelp(alias[topic]);
	} else {
		return oldHelp(topic);
	}
}

math.import({
	about: about,
	help: help
}, {
	override: true
});

})();
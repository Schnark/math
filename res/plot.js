/* The plotting code is based on plot-svg by Bretton Wade, which is availabe under the following license:

The MIT License (MIT)

Copyright (c) 2014 Bretton Wade

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/*global math*/
//jscs:disable disallowYodaConditions
//yes, I just should update jscs
(function () {
"use strict";

function getRange (arrayArrayPoints, coord) {
	var values = arrayArrayPoints.reduce(function (prev, next) {
		return prev.concat(next.map(function (point) {
			return point[coord];
		}));
	}, []).filter(function (val) {
		return isFinite(val);
	}), q0, q25, q50, q75, q100, min, max;
	if (values.length === 0) {
		return {
			min: -0.5,
			max: 0.5
		};
	}
	values.sort(function (a, b) {
		return a - b;
	});
	q0 = values[0];
	q25 = values[Math.floor(values.length / 4)];
	q50 = values[Math.floor(values.length / 2)];
	q75 = values[Math.floor(3 * values.length / 4)];
	q100 = values[values.length - 1];
	min = Math.max(q0 - (q100 - q0) / 100, q50 - 5 * (q75 - q25));
	max = Math.min(q100 + (q100 - q0) / 100, q50 + 5 * (q75 - q25));
	if (max - min < 1e-10) {
		min -= 0.5;
		max += 0.5;
	}
	return {
		min: min,
		max: max
	};
}

function getTicks (min, max, c) {
	function str (n, order) {
		n /= Math.pow(10, order);
		n = Math.round(n * 2) / 2;
		if (n === 0) {
			return '0';
		} else if (order > 3) {
			return n + 'e' + order;
		} else if (order >= -2) {
			return (n * Math.pow(10, order)).toFixed(2).replace(/\.?0+$/, '');
		} else {
			return n + 'e' + order;
		}
	}

	var d = (max - min) / (c - 1), order = Math.floor(Math.log(d) / Math.log(10)), ticks = [], pos;
	d /= Math.pow(10, order);
	if (d <= 1) {
		d = 1;
	} else if (d <= 2) {
		d = 2;
	} else if (d <= 2.5) {
		d = 2.5;
	} else if (d <= 5) {
		d = 5;
	} else {
		d = 1;
		order++;
	}
	d *= Math.pow(10, order);
	pos = Math.ceil(min / d) * d;
	ticks.push({pos: pos, label: str(pos, order)});
	while (ticks[ticks.length - 1].pos + d <= max) {
		pos = ticks[ticks.length - 1].pos + d;
		ticks.push({pos: pos, label: str(pos, order)});
	}
	return ticks;
}

function getPlottingArea (arrayArrayPoints, w, h) {
	var rangeX = getRange(arrayArrayPoints, 'x'),
		rangeY = getRange(arrayArrayPoints, 'y'),
		dx, dy, alpha;
	dx = rangeX.max - rangeX.min;
	dy = rangeY.max - rangeY.min;

	//prefer squares
	alpha = dx / dy * h / w;
	if (1 < alpha && alpha <= 1.5) {
		rangeY.min -= (dy * alpha - dy) / 2;
		rangeY.max += (dy * alpha - dy) / 2;
		dy = rangeY.max - rangeY.min;
	} else if (2 / 3 <= alpha && alpha < 1) {
		rangeX.min -= (dx / alpha - dx) / 2;
		rangeX.max += (dx / alpha - dx) / 2;
		dx = rangeX.max - rangeX.min;
	}

	return {
		ticksX: getTicks(rangeX.min, rangeX.max, w / 40),
		ticksY: getTicks(rangeY.min, rangeY.max, h / 40),
		mapX: function (x) {
			return (x - rangeX.min) / dx * w;
		},
		mapY: function (y) {
			return (y - rangeY.min) / dy * h;
		},
		w: w,
		h: h
	};
}

function svgHead (data) {
	var buffer = data.h * 0.15;
	return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="' +
		(buffer * -1.75) + ', ' + (-buffer) + ', ' + (data.w + 3 * buffer) + ', ' +
		(data.h + 2 * buffer) + '" preserveAspectRatio="xMidYMid meet">' +
		'<g transform="translate(0, ' + data.h + '), scale(1, -1)">';
}

function svgAxes (data) {
	var i, c, svg = '';
	for (i = 0; i < data.ticksX.length; i++) {
		c = data.mapX(data.ticksX[i].pos);
		svg += '<line x1="' + c + '" y1="0" x2="' + c + '" y2="' + data.h + '" stroke="#bbb" stroke-width="0.5" />';
		svg += '<text x="' + c + '" y="12.5" font="16px sans-serif" fill="#888" ' +
			'text-anchor="middle" transform="scale(1, -1)"><tspan dy="0.5em">' + data.ticksX[i].label + '</tspan></text>';
	}
	for (i = 0; i < data.ticksY.length; i++) {
		c = data.mapY(data.ticksY[i].pos);
		svg += '<line x1="0" y1="' + c + '" x2="' + data.w + '" y2="' + c + '" stroke="#bbb" stroke-width="0.5" />';
		svg += '<text x="-7.5" y="' + (-c) + '" font="16px sans-serif" fill="#888" ' +
			'text-anchor="end" transform="scale(1, -1)"><tspan dy="0.33em">' + data.ticksY[i].label + '</tspan></text>';
	}
	return svg;
}

function svgCurve (data, points, color) {
	var i, svg = '', open = false, x, y;
	for (i = 0; i < points.length; i++) {
		x = data.mapX(points[i].x);
		y = data.mapY(points[i].y);
		if (0 <= x && x <= data.w && 0 <= y && y <= data.h) {
			if (!open) {
				svg += '<polyline fill="none" stroke-width="2" stroke="' + color + '" points="';
				open = true;
			}
			svg += x + ',' + y + ' ';
		} else {
			if (open) {
				svg += '" />';
				open = false;
			}
		}
	}
	if (open) {
		svg += '" />';
	}
	return svg;
}

function svgCurves (data, curves) {
	var i, svg = '', colors = [
		'rgb(114,147,203)',
		'rgb(225,151,76)',
		'rgb(132,186,91)',
		'rgb(211,94,96)',
		'rgb(144,103,167)'
	];
	for (i = 0; i < curves.length; i++) {
		svg += svgCurve(data, curves[i], colors[i % colors.length]);
	}
	return svg;
}

function svgFoot () {
	return '</g></svg>';
}

function plotSvg (arrayArrayPoints) {
	var data = getPlottingArea(arrayArrayPoints, 600, 400), svg;
	svg = '<div style="overflow: hidden; max-width: 100%; background-color: #eee;">' +
		svgHead(data) +
		svgAxes(data) +
		svgCurves(data, arrayArrayPoints) +
		svgFoot() +
		'</div>';
	return {
		toString: function () {
			return '[graph]';
		},
		toHtml: function () {
			return svg;
		}
	};
}

function getPointsCartesian (f, start, end, step) {
	var points = [], x;
	for (x = start; x <= end; x += step) {
		points.push({x: x, y: Number(f(x))});
	}
	return points;
}

function getPointsPolar (f, start, end, step) {
	var points = [], phi, r;
	for (phi = start; phi <= end; phi += step) {
		r = f(phi);
		points.push({x: r * Math.cos(phi), y: r * Math.sin(phi)});
	}
	return points;
}

function getPointsParametric (f, g, start, end, step) {
	var points = [], t;
	for (t = start; t <= end; t += step) {
		points.push({x: Number(f(t)), y: Number(g(t))});
	}
	return points;
}

function plotCartesian (fs, start, end, step) {
	return plotSvg(fs.map(function (f) {
		return getPointsCartesian(f, start, end, step || Math.max((end - start) / 1000, 1e-10));
	}));
}

plotCartesian.transform = function (args, _, scope) {
	var variable, start, end, step, fnScope, fnCodes, fns;
	if (args[1] instanceof math.SymbolNode) {
		variable = args[1].name;
	} else {
		throw new Error('Second argument must be a symbol');
	}

	start = args[2].compile().evaluate(scope);
	end = args[3].compile().evaluate(scope);
	if (start >= end) {
		throw new Error('Start must be smaller than end');
	}
	step = args[4] && args[4].compile().evaluate(scope);
	if (step && step <= 0) {
		throw new Error('Step must be positive');
	}

	fnScope = scope;

	if (args[0] instanceof math.ArrayNode) {
		fnCodes = [];
		args[0].forEach(function (f) {
			fnCodes.push(f.compile());
		});
	} else {
		fnCodes = [args[0].compile()];
	}

	fns = fnCodes.map(function (code) {
		return function (x) {
			fnScope.set(variable, x);
			return code.evaluate(fnScope);
		};
	});

	return plotCartesian(fns, start, end, step);
};

plotCartesian.transform.rawArgs = true;

function plotPolar (fs, start, end, step) {
	return plotSvg(fs.map(function (f) {
		return getPointsPolar(f, start, end, step || Math.max((end - start) / 1000, 1e-10));
	}));
}

plotPolar.transform = function (args, _, scope) {
	var variable, start, end, step, fnScope, fnCodes, fns;
	if (args[1] instanceof math.SymbolNode) {
		variable = args[1].name;
	} else {
		throw new Error('Second argument must be a symbol');
	}

	start = args[2].compile().evaluate(scope);
	end = args[3].compile().evaluate(scope);
	if (start >= end) {
		throw new Error('Start must be smaller than end');
	}
	step = args[4] && args[4].compile().evaluate(scope);
	if (step && step <= 0) {
		throw new Error('Step must be positive');
	}

	fnScope = scope;

	if (args[0] instanceof math.ArrayNode) {
		fnCodes = [];
		args[0].forEach(function (f) {
			fnCodes.push(f.compile());
		});
	} else {
		fnCodes = [args[0].compile()];
	}

	fns = fnCodes.map(function (code) {
		return function (x) {
			fnScope.set(variable, x);
			return code.evaluate(fnScope);
		};
	});

	return plotPolar(fns, start, end, step);
};

plotPolar.transform.rawArgs = true;

function plotParametric (fs, gs, start, end, step) {
	return plotSvg(fs.map(function (f, i) {
		return getPointsParametric(f, gs[i], start, end, step || Math.max((end - start) / 1000, 1e-10));
	}));
}

plotParametric.transform = function (args, _, scope) {
	var variable, start, end, step, fnScope, fn1Codes, fn2Codes, fn1s, fn2s;
	if (args[2] instanceof math.SymbolNode) {
		variable = args[2].name;
	} else {
		throw new Error('Third argument must be a symbol');
	}

	start = args[3].compile().evaluate(scope);
	end = args[4].compile().evaluate(scope);
	if (start >= end) {
		throw new Error('Start must be smaller than end');
	}
	step = args[5] && args[5].compile().evaluate(scope);
	if (step && step <= 0) {
		throw new Error('Step must be positive');
	}

	fnScope = scope;

	if (args[0] instanceof math.ArrayNode) {
		fn1Codes = [];
		args[0].forEach(function (f) {
			fn1Codes.push(f.compile());
		});
	} else {
		fn1Codes = [args[0].compile()];
	}

	fn1s = fn1Codes.map(function (code) {
		return function (x) {
			fnScope.set(variable, x);
			return code.evaluate(fnScope);
		};
	});

	if (args[1] instanceof math.ArrayNode) {
		fn2Codes = [];
		args[1].forEach(function (f) {
			fn2Codes.push(f.compile());
		});
	} else {
		fn2Codes = [args[1].compile()];
	}

	fn2s = fn2Codes.map(function (code) {
		return function (x) {
			fnScope.set(variable, x);
			return code.evaluate(fnScope);
		};
	});

	return plotParametric(fn1s, fn2s, start, end, step);
};

plotParametric.transform.rawArgs = true;

math.import({
	plotCartesian: plotCartesian,
	plotPolar: plotPolar,
	plotParametric: plotParametric
});

})();
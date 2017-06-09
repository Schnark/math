/*global math, PlotSvg*/
(function () {
"use strict";

function plotSvg (points) {
	PlotSvg.setPlotPoints(false);
	return PlotSvg.multipleLine(null, null, null, points);
}

function getPointsCartesian (f, start, end, step) {
	var points = [], x;
	for (x = start; x <= end; x += step) {
		points.push({x: x, y: f(x)});
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
		points.push({x: f(t), y: g(t)});
	}
	return points;
}

function plotCartesian (fs, start, end, step) {
	return plotSvg(fs.map(function (f) {
		return getPointsCartesian(f, start, end, step || 0.01);
	}));
}

plotCartesian.transform = function (args, _math, scope) {
	var variable, start, end, step, fnScope, fnCodes, fns;
	if (args[1] instanceof math.expression.node.SymbolNode) {
		variable = args[1].name;
	} else {
		throw new Error('Second argument must be a symbol');
	}

	start = args[2].compile().eval(scope);
	end = args[3].compile().eval(scope);
	step = args[4] && args[4].compile().eval(scope);

	fnScope = Object.create(scope);

	if (args[0] instanceof math.expression.node.ArrayNode) {
		fnCodes = [];
		args[0].forEach(function (f) {
			fnCodes.push(f.compile());
		});
	} else {
		fnCodes = [args[0].compile()];
	}

	fns = fnCodes.map(function (code) {
		return function (x) {
			fnScope[variable] = x;
			return code.eval(fnScope);
		};
	});

	return plotCartesian(fns, start, end, step);
};

plotCartesian.transform.rawArgs = true;

function plotPolar (fs, start, end, step) {
	return plotSvg(fs.map(function (f) {
		return getPointsPolar(f, start, end, step || 0.01);
	}));
}

plotPolar.transform = function (args, _math, scope) {
	var variable, start, end, step, fnScope, fnCodes, fns;
	if (args[1] instanceof math.expression.node.SymbolNode) {
		variable = args[1].name;
	} else {
		throw new Error('Second argument must be a symbol');
	}

	start = args[2].compile().eval(scope);
	end = args[3].compile().eval(scope);
	step = args[4] && args[4].compile().eval(scope);

	fnScope = Object.create(scope);

	if (args[0] instanceof math.expression.node.ArrayNode) {
		fnCodes = [];
		args[0].forEach(function (f) {
			fnCodes.push(f.compile());
		});
	} else {
		fnCodes = [args[0].compile()];
	}

	fns = fnCodes.map(function (code) {
		return function (x) {
			fnScope[variable] = x;
			return code.eval(fnScope);
		};
	});

	return plotPolar(fns, start, end, step);
};

plotPolar.transform.rawArgs = true;

function plotParametric (fs, gs, start, end, step) {
	return plotSvg(fs.map(function (f, i) {
		return getPointsParametric(f, gs[i], start, end, step || 0.01);
	}));
}

plotParametric.transform = function (args, _math, scope) {
	var variable, start, end, step, fnScope, fn1Codes, fn2Codes, fn1s, fn2s;
	if (args[2] instanceof math.expression.node.SymbolNode) {
		variable = args[2].name;
	} else {
		throw new Error('Third argument must be a symbol');
	}

	start = args[3].compile().eval(scope);
	end = args[4].compile().eval(scope);
	step = args[5] && args[5].compile().eval(scope);

	fnScope = Object.create(scope);

	if (args[0] instanceof math.expression.node.ArrayNode) {
		fn1Codes = [];
		args[0].forEach(function (f) {
			fn1Codes.push(f.compile());
		});
	} else {
		fn1Codes = [args[0].compile()];
	}

	fn1s = fn1Codes.map(function (code) {
		return function (x) {
			fnScope[variable] = x;
			return code.eval(fnScope);
		};
	});

	if (args[1] instanceof math.expression.node.ArrayNode) {
		fn2Codes = [];
		args[1].forEach(function (f) {
			fn2Codes.push(f.compile());
		});
	} else {
		fn2Codes = [args[1].compile()];
	}

	fn2s = fn2Codes.map(function (code) {
		return function (x) {
			fnScope[variable] = x;
			return code.eval(fnScope);
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
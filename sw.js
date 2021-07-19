/*global caches, fetch, Promise */
(function (worker) {
"use strict";

var PREFIX = 'math',
	VERSION = '1.20',
	FILES = [
		'index.html',
		'res/app.css',
		'res/app.js',
		'res/currency.js',
		'res/help.js',
		'res/input.css',
		'res/input.js',
		'res/keyboard.css',
		'res/keyboard.js',
		'res/plot.js',
		'res/lib/math.min.js'
	];

worker.addEventListener('install', function (e) {
	e.waitUntil(
		caches.open(PREFIX + ':' + VERSION).then(function (cache) {
			return cache.addAll(FILES);
		})
	);
});

worker.addEventListener('activate', function (e) {
	e.waitUntil(
		caches.keys().then(function (keys) {
			return Promise.all(keys.map(function (key) {
				if (key.indexOf(PREFIX + ':') === 0 && key !== PREFIX + ':' + VERSION) {
					return caches.delete(key);
				}
			}));
		})
	);
});

worker.addEventListener('fetch', function (e) {
	e.respondWith(caches.match(e.request, {ignoreSearch: true})
		.then(function (response) {
			return response || fetch(e.request);
		})
	);
});

})(this);
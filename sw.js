/*global caches, fetch, Promise */
(function (worker) {
"use strict";

var VERSION = 'v1.14',
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
		caches.open(VERSION).then(function (cache) {
			return cache.addAll(FILES);
		})
	);
});

worker.addEventListener('activate', function (e) {
	e.waitUntil(
		caches.keys().then(function (keys) {
			return Promise.all(keys.map(function (key) {
				if (key !== VERSION) {
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
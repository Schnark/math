/*global Input: true*/
Input =
(function () {
"use strict";

function Input (el) {
	this.el = el;
	this.pre = document.createElement('span');
	this.cursor = document.createElement('span');
	this.post = document.createElement('span');
	this.text = '';
	this.cursorPos = 0;
	this.cursor.className = 'cursor';

	el.appendChild(this.pre);
	el.appendChild(this.cursor);
	el.appendChild(this.post);

	if (document.caretPositionFromPoint) {
		this.initClick();
	}
}

Input.prototype.initClick = function () {
	this.el.addEventListener('click', function (e) {
		var range = document.caretPositionFromPoint(e.clientX, e.clientY),
			node = range.offsetNode, offset = range.offset;
		if (this.pre === node || this.pre === node.parentNode) {
			this.cursorPos = offset;
			this.update();
		} else if (this.post === node || this.post === node.parentNode) {
			this.cursorPos += offset;
			this.update();
		}
	}.bind(this));
};

Input.prototype.bindClickOnce = function (callback) {
	var el = this.el;
	function handler () {
		el.removeEventListener('click', handler);
		callback();
	}
	el.addEventListener('click', handler);
};

Input.prototype.toggle = function (on) {
	this.el.className = on ? 'active' : 'inactive';
};

Input.prototype.update = function () {
	this.pre.textContent = this.text.slice(0, this.cursorPos);
	this.post.textContent = this.text.slice(this.cursorPos);
	this.cursor.scrollIntoView();
};

Input.prototype.getText = function () {
	return this.text;
};

Input.prototype.setText = function (text) {
	this.text = text;
	this.cursorPos = text.length;
	this.update();
};

Input.prototype.moveCursor = function (dir) {
	switch (dir) {
	case 'left':
		if (this.cursorPos === 0) {
			return;
		}
		this.cursorPos--;
		break;
	case 'right':
		if (this.cursorPos === this.text.length) {
			return;
		}
		this.cursorPos++;
		break;
	case 'start':
		if (this.cursorPos === 0) {
			return;
		}
		this.cursorPos = 0;
		break;
	case 'end':
		if (this.cursorPos === this.text.length) {
			return;
		}
		this.cursorPos = this.text.length;
		break;
	default:
		return;
	}
	this.update();
};

Input.prototype.insert = function (pre, post) {
	post = post || '';
	this.text = this.text.slice(0, this.cursorPos) + pre + post + this.text.slice(this.cursorPos);
	this.cursorPos += pre.length;
	this.update();
};

Input.prototype.remove = function (toRight) {
	if (
		(toRight && this.cursorPos === this.text.length) ||
		(!toRight && this.cursorPos === 0)
	) {
		return;
	}
	this.text =
		this.text.slice(0, toRight ? this.cursorPos : this.cursorPos - 1) +
		this.text.slice(toRight ? this.cursorPos + 1 : this.cursorPos);
	if (!toRight) {
		this.cursorPos--;
	}
	this.update();
};

return Input;
})();
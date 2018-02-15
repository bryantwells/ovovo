(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = {
    init: function init(selector) {
        var _this = this;

        // get all kern parent elements
        var elements = [].concat(_toConsumableArray(document.querySelectorAll(selector)));

        elements.forEach(function (element) {

            _this.wrapContent(element);
        });
    },
    wrapContent: function wrapContent(element) {
        var _this2 = this;

        if (element.hasChildNodes()) {

            var children = [].concat(_toConsumableArray(element.childNodes));

            children.forEach(function (child, i) {

                if (child.nodeValue == false) {

                    // 'garbage collection'

                    child.remove();
                } else if (child.nodeType === 3) {

                    var words = child.textContent.trim().split(' ');

                    var nextSibling = child.nextSibling;
                    var parentNode = child.parentNode;

                    // remove original text

                    child.remove();

                    words.forEach(function (word, j) {

                        // build word element

                        var wordElement = document.createElement('span');
                        wordElement.classList.add('Word');
                        wordElement.dataset.word = word;

                        // get kern vals

                        var kernValues = window.getComputedStyle(wordElement).getPropertyValue('--kerning').toString().trim().split(' ');

                        word.split('').forEach(function (letter) {

                            // fill word with letter elements

                            var letterElement = document.createElement('span');
                            letterElement.style.marginRight = kernValues[i] + 'em';
                            letterElement.innerText = letter;
                            letterElement.classList.add('Letter');
                            letterElement.dataset.letter = letter;
                            wordElement.appendChild(letterElement);
                        });

                        // add word to parent

                        parentNode.insertBefore(wordElement, nextSibling);

                        if (word.slice(-1) === '.' && j !== words.length - 1) {

                            // add a return

                            var returnElement = document.createElement('span');
                            returnElement.innerHTML = '&nbsp;&nbsp;';
                            returnElement.classList.add('Return');
                            parentNode.insertBefore(returnElement, nextSibling);
                        } else if (word.slice(-1) !== '.') {

                            // add a space

                            var spaceElement = document.createElement('span');
                            spaceElement.innerHTML = '&nbsp;';
                            spaceElement.classList.add('Space');
                            parentNode.insertBefore(spaceElement, nextSibling);
                        }
                    });
                } else if (child.nodeType === 1) {

                    // recur

                    _this2.wrapContent(child);
                }
            });
        }
    }
};

},{}]},{},[1]);

'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var wrapContent = function wrapContent(element) {

    if (element.hasChildNodes()) {

        var children = [].concat(_toConsumableArray(element.childNodes));

        children.forEach(function (child, i) {

            if (child.nodeValue == false) {

                // 'garbage collection'

                child.remove();
            } else if (child.nodeType === 3) {

                var nextSibling = child.nextSibling;
                var parentNode = child.parentNode;
                var words = child.textContent.trim().split(' ');

                // remove original text

                child.remove();

                words.forEach(function (word, j) {

                    // build word element

                    var wordElement = document.createElement('span');
                    wordElement.classList.add('Word');
                    wordElement.dataset.word = word;

                    // add word to parent

                    parentNode.insertBefore(wordElement, nextSibling);

                    // get kern vals

                    var kernValues = window.getComputedStyle(wordElement).getPropertyValue('--kerning').toString().trim().split(' ');

                    console.log(kernValues);

                    word.split('').forEach(function (letter, i) {

                        // fill word with letter elements

                        var letterElement = document.createElement('span');
                        letterElement.style.marginRight = kernValues[i] + 'em';
                        letterElement.innerText = letter;
                        letterElement.classList.add('Letter');
                        letterElement.dataset.letter = letter;
                        wordElement.appendChild(letterElement);
                    });

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

                wrapContent(child);
            }
        });
    }
};

var ovovo = function ovovo(selector) {

    // get all kern parent elements

    var elements = [].concat(_toConsumableArray(document.querySelectorAll(selector)));

    elements.forEach(function (element) {

        wrapContent(element);
    });
};

module.exports = ovovo;

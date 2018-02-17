const wrapContent = (element) => {

    if (element.hasChildNodes()) {

        const children = [...element.childNodes]

        children.forEach((child, i) => {

            if (child.nodeValue == false) {

                // 'garbage collection'

                child.remove()

            } else if (child.nodeType === 3 ) {

                const nextSibling = child.nextSibling
                const parentNode = child.parentNode
                const words = child.textContent
                    .trim()
                    .split(' ')

                // remove original text

                child.remove()

                words.forEach((word, j) => {

                    // build word element

                    const wordElement = document.createElement('span')
                    wordElement.classList.add('Word')
                    wordElement.dataset.word = word

                    // add word to parent

                    parentNode.insertBefore(wordElement, nextSibling)

                    // get kern vals

                    const kernValues = window.getComputedStyle(wordElement)
                        .getPropertyValue('--kerning')
                        .toString()
                        .trim()
                        .split(' ')

                    console.log(kernValues)
                    
                    word.split('').forEach((letter, i) => {

                        // fill word with letter elements

                        const letterElement = document.createElement('span')
                        letterElement.style.marginRight = `${kernValues[i]}em`
                        letterElement.innerText = letter
                        letterElement.classList.add('Letter')
                        letterElement.dataset.letter = letter
                        wordElement.appendChild(letterElement)

                    })

                    if (word.slice(-1) === '.' && j !== words.length - 1) {

                        // add a return

                        const returnElement = document.createElement('span')
                        returnElement.innerHTML = '&nbsp;&nbsp;'
                        returnElement.classList.add('Return')
                        parentNode.insertBefore(returnElement, nextSibling)

                    } else if (word.slice(-1) !== '.') {

                        // add a space

                        const spaceElement = document.createElement('span')
                        spaceElement.innerHTML = '&nbsp;'
                        spaceElement.classList.add('Space')
                        parentNode.insertBefore(spaceElement, nextSibling)

                    }
                            
                })

            } else if (child.nodeType === 1) {

                // recur

                wrapContent(child)

            }

        })

    }

}
    
const ovovo = (selector) => {

    // get all kern parent elements

    const elements = [...document.querySelectorAll(selector)]

    elements.forEach((element) => { 

        wrapContent(element) 
    
    })

}

module.exports = ovovo
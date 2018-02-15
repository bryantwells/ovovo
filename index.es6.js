export default {

    init (selector) {

        // get all kern parent elements
        const elements = [...document.querySelectorAll(selector)]

        elements.forEach((element) => { 

            this.wrapContent(element) 
        
        })

    },

    wrapContent(element) {

        if (element.hasChildNodes()) {

            const children = [...element.childNodes]

            children.forEach( (child, i) => {

                if (child.nodeValue == false) {

                    // 'garbage collection'

                    child.remove()

                } else if (child.nodeType === 3 ) {

                    const words = child.textContent
                        .trim()
                        .split(' ')

                    const nextSibling = child.nextSibling
                    const parentNode = child.parentNode

                    // remove original text

                    child.remove()

                    words.forEach((word, j) => {

                        // build word element

                        const wordElement = document.createElement('span')
                        wordElement.classList.add('Word')
                        wordElement.dataset.word = word

                        // get kern vals

                        const kernValues = window.getComputedStyle(wordElement)
                            .getPropertyValue('--kerning')
                            .toString()
                            .trim()
                            .split(' ')

                        word.split('').forEach((letter) => {

                            // fill word with letter elements

                            const letterElement = document.createElement('span')
                            letterElement.style.marginRight = `${kernValues[i]}em`
                            letterElement.innerText = letter
                            letterElement.classList.add('Letter')
                            letterElement.dataset.letter = letter
                            wordElement.appendChild(letterElement)

                        })

                        // add word to parent

                        parentNode.insertBefore(wordElement, nextSibling)

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

                    this.wrapContent(child)

                }

            })

        }

    }
    
}
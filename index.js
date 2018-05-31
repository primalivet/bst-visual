import Tree from './Tree.js' 
import { compose, randomNumber } from './helpers.js'
import * as GLOBALS from './constants.js'
import { 
    addNodeLevel, 
    addNodePosition, 
    drawNodeLine, 
    drawNodePoint, 
    drawNodeText,
    getNodePath
} from './node-extras.js'

const search = document.getElementById('search')
const butons = document.getElementById('buttons')
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const tree = new Tree()

function draw(context, tree, activeNodes = null) {
    context.clearRect(0,0, canvas.width, canvas.height)
    tree.hierarchical(node => {
        drawNodeLine(context, node, GLOBALS.LINE_COLOR)
        drawNodePoint(context, node, GLOBALS.POINT_COLOR)
    })

    if (activeNodes) {
        activeNodes.forEach(node => {
            drawNodeLine(context, node, GLOBALS.LINE_COLOR_ACTIVE)
        })   
    
        activeNodes.forEach(node => {
            drawNodePoint(context, node, GLOBALS.POINT_COLOR_ACTIVE)
            drawNodeText(context, node, GLOBALS.TEXT_COLOR_ACTIVE, GLOBALS.FONT)
        })
    }
}

function setup() {
    for (let i = 0; i < 100; i++) {
        const number = randomNumber()       
        tree.addNode(number)
    }

    tree.hierarchical(node => {
        node = addNodeLevel(node)
        node = addNodePosition(node)
    })

    tree.traverse(node => {
      const button = document.createElement('button')
      button.setAttribute('data-value', node.data)
      button.innerText = node.data
      buttons.appendChild(button)  
    })

    buttons.addEventListener('click', event => {
        const query = parseInt(event.target.dataset.value)
        if (Number.isNaN(query)) {
            console.log('Can only search for numbers')
            draw(context, tree)
        } else {
            const result = tree.search(query)
            if (result) {
                const nodes = getNodePath(result) 
                draw(context, tree, nodes)
            } else {
                console.log('Nothing match your query')
                draw(context, tree)
            }
        }
    })
    
    search.addEventListener('keyup', event => {
        const query = parseInt(event.target.value)

        if (Number.isNaN(query)) {
            console.log('Can only search for numbers')
            draw(context, tree)
        } else {
            const result = tree.search(query)
            if (result) {
                const nodes = getNodePath(result) 
                draw(context, tree, nodes)
            } else {
                console.log('Nothing match your query')
                draw(context, tree)
            }
        } 
    })
}

setup()
draw(context, tree)




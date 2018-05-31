import Vector2 from './Vector2.js'

export function addNodePosition(node) {
    if (node.parent !== null) {        
        if (node.parent.left === node) {
            node.pos = new Vector2(node.parent.pos.x - 50, node.parent.pos.y + 25)
        } else if (node.parent.right = node) {
            node.pos = new Vector2(node.parent.pos.x + 50, node.parent.pos.y + 25)
        }
    } else {
        node.pos = new Vector2(canvas.width / 2, 25) 
    }
    return node
}

export function addNodeLevel(node) {
    function getNodeLevel(parentNode, level = 0) {
        if (parentNode.parent === null) {
            return level
        } else {
            return getNodeLevel(parentNode.parent, level + 1)
        }
    }
    node.level = getNodeLevel(node)
    return node
}

export function getNodePath(node, path = []) {
    if (node.parent === null) {
        path.push(node)
        return path
    } else {
        path.push(node)
        return getNodePath(node.parent, path)
    }
}

export function drawNodeLine(context, node, color) {
    context.strokeStyle = color
    if (node.parent !== null) {    
        context.beginPath()
        context.moveTo(node.parent.pos.x, node.parent.pos.y)
        context.lineTo(node.pos.x, node.pos.y)
        context.stroke()
    }
}

export function drawNodeText(context, node, color, font) {
    context.fillStyle = color
    context.font = font
    if (node.data > 9) {
        context.fillText(node.data, node.pos.x - 8, node.pos.y - 10)
    } else {
       context.fillText(node.data, node.pos.x - 5, node.pos.y - 10)
    }
}

export function drawNodePoint(context, node, color) {
    context.fillStyle = color
    context.beginPath()
    context.arc(node.pos.x, node.pos.y, 5, 0, Math.PI * 2)
    context.closePath()
    context.fill()
}
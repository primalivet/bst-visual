import Node from './Node.js'

export default function Tree() {
    this.root = null
}

Tree.prototype.addNode = function(data) {
    if (this.root === null) {
        return this.root = new Node(data)
    } else {
        return this.root.addNode(data)
    }
    
}

Tree.prototype.hierarchical = function(callback = (node) => console.log(node)) {
    this.root.hierarchical(callback)
}

Tree.prototype.traverse = function(callback = (node) => console.log(node)) {
    this.root.visit(callback)
}

Tree.prototype.search = function(query) {
    return this.root.search(query)
}
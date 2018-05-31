export default function Node(data, parent = null) {
    this.left = null
    this.right = null
    this.parent = parent
    this.data = data
    this.counter = 1
}

Node.prototype.visit = function(callback) {
    if (this.left !== null) {
        this.left.visit(callback)    
    }
    callback(this)
    if (this.right !== null) {
        this.right.visit(callback)
    }
}

Node.prototype.hierarchical = function(callback) {
    callback(this)
    if (this.left !== null) {
        this.left.hierarchical(callback)
    }
    if (this.right !== null) {
        this.right.hierarchical(callback)
    }
}

Node.prototype.search = function(query) {
    if (this.data === query) {
        // data should match the query
        return this
    } else if (this.data > query && this.left !== null) {
        // data didnt match query, go left
        return this.left.search(query)    
    } else if (this.data < query && this.right !== null) {
        // data didnt match query, go right
        return this.right.search(query)
    } else {
        return undefined
    }
}

Node.prototype.addNode = function(data) {
    if (this.data > data) {
        // data is less than this.data, go left
        if (this.left === null) {
            return this.left = new Node(data, this)
         } else {
             return this.left.addNode(data)
         }
    } else if (this.data < data) {
        // data is greater than this.data, go right
        if (this.right === null) {
            return this.right = new Node(data, this)
         } else if (this.right !== null) {
            return this.right.addNode(data)
        }
    } else {
        // data is equal to this.data, increase counter
        this.counter += 1
        return this
    }
}
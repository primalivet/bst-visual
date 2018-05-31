export default function Vector2(x = 0, y = 0) {
    this.set(x, y)
}

Vector2.prototype.set = function(x = 0, y = 0) {
    this.x = x
    this.y = y
}
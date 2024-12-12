class Player {
  constructor({ x, y, radius, colour }) {
    this.x = x
    this.y = y
    this.radius = radius
    this.colour = colour
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius * window.devicePixelRatio, 0, Math.PI * 2, false)
    c.fillStyle = this.colour
    c.fill()
  }
}

const express = require('express')
const app = express()
const port = 5500

const http = require('http')
const server = http.createServer(app)

const { Server } = require('socket.io')
const io = new Server(server, { pingInterval : 2000, pingTimeout : 5000 })

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

const backEndPlayers = {}

const SPEED = 10

io.on('connection', (socket) => {
  console.log('An User Connected')
  backEndPlayers[socket.id] = {
    x: 500 * Math.random(),
    y: 500 * Math.random(),
    color: `hsl(${720 * Math.random()}, 100%, 50%)`,
    sequenceNumber: 0
  }

  io.emit("updatePlayers", backEndPlayers)

  socket.on('disconnect', (reason) => {
    console.log('An User Disconnected with Reason: ', reason)
    delete backEndPlayers[socket.id]
    io.emit("updatePlayers", backEndPlayers)
  })

  socket.on('keydown', ({ keycode, sequenceNumber }) => {
    if (keycode && sequenceNumber) {  
      backEndPlayers[socket.id].sequenceNumber = sequenceNumber
      switch (keycode) {
        case 'KeyW':
          backEndPlayers[socket.id].y -= 5
          break
    
        case 'KeyS':
          backEndPlayers[socket.id].y += 5
          break
    
        case 'KeyA':
          backEndPlayers[socket.id].x -= 5
          break
    
        case 'KeyD':
          backEndPlayers[socket.id].x += 5
          break
        
        case 'Space':
          backEndPlayers[socket.id].color = `hsl(${720 * Math.random()}, 100%, 50%)`
          break
      }}
  })

  console.log(backEndPlayers)
})

setInterval(() => {
  io.emit("updatePlayers", backEndPlayers)
}, 15)

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

console.log('Server running with ExpressJS and HTTP')

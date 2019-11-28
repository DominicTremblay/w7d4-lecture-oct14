const express = require('express');

const PORT = process.env.port || 3001;
const SocketServer = require('ws');
const app = express();

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const wss = new SocketServer.Server({ server });

wss.broadcast = (data) => {
  console.log('broadcasting...')
  wss.clients.forEach((client) => {
    if (client.readyState === SocketServer.OPEN) {
      console.log('sending to client')
      client.send(data);
    }
  });
};

wss.on('connection', wsClient => {

  console.log('Client connected')

  wsClient.on('message', data => {
    // here getting message from the client

    const message = JSON.parse(data);

    console.log(message)

    switch (message.type) {

      case 'postMessage':
        message.type = 'incomingMessage';
        break;
      default:
        console.log("unkown message type")
    }

    wss.broadcast(JSON.stringify(message));

  });

  wsClient.on('close', () => console.log('Client disconnected'))


});
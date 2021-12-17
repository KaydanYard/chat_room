const fs = require("fs");
const net = require("net");
const port = 5000;

const clients = [];
var clientNum = 0;

const server = net.createServer((client) => {
  client.write('Welcome to the Chat Room');
  clientNum++;
  client.username = "Guest " + clientNum;
  client.id = clientNum;

  clients.forEach(currentClient => {
    if (currentClient.id !== client.id) {
      currentClient.write(`${client.username} Joined the Server`);
    }
  })
  //let clientName = client.username;
  //clients += clientName;
  clients.push(client);
  console.log(clients);

  client.on('data', (data) => {
    clients.forEach(currentClient => {
      if (currentClient.id !== client.id) {
        let clientData = data.toString().trim();
        currentClient.write(`${client.username}: ${clientData}`);
      }
    })
  });

  client.on('end', () => {

    clients.forEach(currentClient => {
      if (currentClient.id !== client.id) {
        currentClient.write(`${client.username} Disconnected`);
      }
    })

    console.log('Client Disconnected', client.id);
    clientNum--;
  })
}).listen(port, () => {
  console.log(`listening to port: ${port}`);
});

console.log('you are listening to the server');

server.on('connection', () => {
  console.log(`${clients[clientNum - 1].username} connected`);
});
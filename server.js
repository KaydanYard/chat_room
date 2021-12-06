const fs = require("fs");
const net = require("net")

let sockets = [];

const server = net.createServer((client) => {

  client.write('Welcome to the Chat Room');

}).listen(5000);

console.log('you are listening to the server');


const fs = require("fs");
const net = require("net");
const EventEmitter = require("events");

class Client extends EventEmitter {
  constructor(username) {
    super();
    this.username = username;

    this.once("username", () => {
      //get username here
    })
  }
}

const chatLog = fs.createWriteStream("chatLog.txt");

const client = net.createConnection({ port: 5000 }, () => {
  console.log("connected")
});
process.stdin.pipe(client);

client.on('data', (data) => {
  console.log(data.toString());
});


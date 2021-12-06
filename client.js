const { randomInt } = require("crypto");
const fs = require("fs");
const net = require("net");

let i = 1;
let username = `guest${i}`;
const clients = [];

const chatLog = fs.createWriteStream("chatLog.txt");
process.stdin.pipe(chatLog);

const client = net.createConnection({ port: 5000 }, () => {
  client.write(`${username} connected`);
});

client.on('data', (data) => {
  console.log("Message from server: " + data.toString());
  client.end();
});

client.on('connected', () => {
  console.log(`${username} connected`)
})
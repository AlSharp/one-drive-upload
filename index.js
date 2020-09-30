const fs = require('fs');
const key = fs.readFileSync('./privkey.pem');
const cert = fs.readFileSync('./cert.pem');
const ca = fs.readFileSync('./chain.pem');
const express = require('express');
const app = express();
const server = require('https').createServer({key, cert, ca}, app);
const oneDrive = require('./onedrive');

const PORT = 5000;

server.listen(PORT);

app.use('/', express.static(__dirname + '/ui'));
app.get('/', (req, res) => res.sendFile(__dirname + '/ui/index.html'));

async function main() {
  await oneDrive();
}

main();
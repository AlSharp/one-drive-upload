const fs = require('fs');
const key = fs.readFileSync('./keys/privkey.pem');
const cert = fs.readFileSync('./keys/cert.pem');
const ca = fs.readFileSync('./keys/chain.pem');
const express = require('express');
const app = express();
const server = require('https').createServer({key, cert, ca}, app);
// const oneDrive = require('./onedrive');

const PORT = 5000;

server.listen(PORT);

app.use('/', express.static(__dirname + '/ui/dist'));
app.get('/', (req, res) => res.sendFile(__dirname + '/ui/dist/index.html'));

async function main() {
  // await oneDrive();
}

main();
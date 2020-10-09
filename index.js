const fs = require('fs');
const key = fs.readFileSync('./keys/privkey.pem');
const cert = fs.readFileSync('./keys/cert.pem');
const ca = fs.readFileSync('./keys/chain.pem');
const express = require('express');
const app = express();
const server = require('https').createServer({key, cert, ca}, app);

const oneDriveMagic = require('./lib/onedrive');
const fsMagic = require('./lib/fs');
const sshMagic = require('./lib/ssh');

const {
  pathToBuilds
} = require('./secrets/fs/paths');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const PORT = 5000;

server.listen(PORT);

// app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', express.static(__dirname + '/ui/dist'));
app.get('/', (req, res) => res.sendFile(__dirname + '/ui/dist/index.html'));

app.get('/api/builds', async (req, res) => {
  try {
    const [folders, files] = await fsMagic.readDir(pathToBuilds);
    res.status(200).json(folders);
  }
  catch(error) {
    console.log(error);
    res.status(500).end('I am sorry! Server error!');
  }
})

async function main() {
  // await oneDrive();
}

main();
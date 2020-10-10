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

const {
  WHITE_LISTED_DOMAINS,
  JWT_SECRET,
  UNPROTECTED_PATHS,
  PROTECTED_PATHS
} = require('./auth/config');

const {jwtAuth} = require('./auth/middleware');

const authState = {
  username: null
}

const PORT = 5000;

server.listen(PORT);

const corsOptions = {
  credentials: true,
  origin: (origin, cb) => {
    if (WHITE_LISTED_DOMAINS.indexOf(origin) !== -1 || !origin) {
      cb(null, true);
    } else {
      cb(new Error('I am sorry! Not allowed by CORS'));
    }
  }
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  UNPROTECTED_PATHS.concat(PROTECTED_PATHS),
  express.static(__dirname + '/ui/dist')
);
app.get(PROTECTED_PATHS, jwtAuth(JWT_SECRET, authState), (req, res) => {
  res.sendFile(__dirname + '/ui/dist/index.html');
});

app.get(UNPROTECTED_PATHS, (req, res) => {
  res.sendFile(__dirname + '/ui/dist/index.html');
})

app.get('/api/checkToken', jwtAuth(JWT_SECRET, authState), (req, res) => {
  res.status(200).json({status: true});
});

require('./api/login')(app, JWT_SECRET, authState);
require('./api/logout')(app, authState);

app.get('/api/builds', async (req, res) => {
  try {
    const [folders, files] = await fsMagic.readDir(pathToBuilds);
    res.status(200).json(folders);
  }
  catch(error) {
    console.log(error);
    res.status(500).end('I am sorry! Server error!');
  }
});
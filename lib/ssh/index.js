const {NodeSSH} = require('node-ssh');

const ssh = new NodeSSH();

const open = async ({host, username, password}) => {
  try {
    await ssh.connect({host, username, password})
  }
  catch(error) {
    throw error;
  }
}

const close = () => {
  try {
    ssh.dispose();
  }
  catch(error) {
    throw error;
  }
}

module.exports = {
  open,
  close
}
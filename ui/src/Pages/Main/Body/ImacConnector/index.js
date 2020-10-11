import React, {useState} from 'react';
import styled from 'styled-components';

const _ImacConnector = ({className, isConnected, setIsConnected}) => {
  const [host, setHost] = useState('');

  function handleHostChange(event) {
    setHost(event.target.value);
  }

  function connect() {
    setIsConnected(true);
  }

  function disconnect() {
    setIsConnected(false);
  }

  return (
    <div className={className}>
      <div>
        Upload to:
      </div>
      <div>
        <label>Host name or IP</label>
        <input type="text" value={host} onChange={handleHostChange} />
      </div>
      <div>
        {
          !isConnected ?
          <button onClick={connect}>
            Connect
          </button> :
          <button onClick={disconnect}>
            Disconnect
          </button>
        }
      </div>
    </div>
  )
}

const ImacConnector = styled(_ImacConnector)`
  height: 200px;
  width: 200px;
  border: 1px solid;
  margin: 0 10px;
`;

export default ImacConnector;
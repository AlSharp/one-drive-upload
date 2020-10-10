import React, {useState} from 'react';
import styled from 'styled-components';

import {getURI} from '../../lib';

const _Main = ({className, history}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [message, setMessage] = useState();

  const handleLogout = event => {
    event.preventDefault();
    fetch(`${getURI()}/api/logout`, {
      credentials: 'include'
    })
      .then(res => {
        setIsLoggedIn(false);
        setMessage('Logging out...');
        setTimeout(() => {
          history.push('/login');
        }, 1500)
      })
  }

  return (
    <div className={className}>
      {
        isLoggedIn ?
        <button onClick={handleLogout}>Log out</button> :
        null
      }
      {
        message ?
        <div>{message}</div> :
        null
      }
    </div>
  )
}
  
const Main = styled(_Main)`

`;

export default Main;
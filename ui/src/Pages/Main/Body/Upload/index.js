import React, {useState} from 'react';
import styled from 'styled-components';

const _Upload = ({className}) => {
  return (
    <div className={className}>
      <button>Upload</button>
    </div>
  )
}

const Upload = styled(_Upload)`
  height: 200px;
  width: 200px;
  border: 1px solid;
  margin: 0 10px;
`;

export default Upload;
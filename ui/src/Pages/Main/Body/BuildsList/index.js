import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';

import {getURI} from '@lib';

const _BuildsList = ({className}) => {
  const isMounted = useRef(true);
  const [build, setBuild] = useState('');
  const [builds, setBuilds] = useState([]);

  const handleBuildSelect = event => {
    setBuild(event.target.value);
  }

  useEffect(() => {
    fetchBuilds();

    return () => {
      isMounted.current = false;
    }
  }, [builds]);

  async function fetchBuilds() {
    const res = await fetch(`${getURI()}/api/builds`, {credentials: 'include'});
    const {error, builds} = await res.json();
    if (isMounted.current) {
      if (error) {
        setBuilds([]);
      } else {
        setBuilds(builds);
      }
    }
  }

  return (
    <div className={className}>
      <div>
        Select version of build:
      </div>
      <div>
        <select
          value={build}
          onChange={handleBuildSelect}
        >
          <option value=""></option>
          {
            builds.map((build, index) =>
              <option value={build} key={index}>{build}</option>
            )
          }
        </select>
      </div>
    </div>
  )
}

const BuildsList = styled(_BuildsList)`
  height: 200px;
  width: 200px;
  border: 1px solid;
  margin: 0 10px;
`;

export default BuildsList;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/workspaces')
      .then(response => {
        setWorkspaces(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Workspaces</h1>
      <ul>
        {workspaces.map(ws => (
          <li key={ws.workspace_id}>{ws.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

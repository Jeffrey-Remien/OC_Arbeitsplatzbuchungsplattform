import React, { useEffect, useState }  from 'react';
import './Home.css';
import axios from 'axios'

function Home() {
    const [workspaces, setWorkspaces] = useState({ available: [], booked: [] });
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today
  
    useEffect(() => {
      if (date) {
        axios.get(`/api/workspaces/status/day?date=${date}`)
          .then(response => {
            setWorkspaces(response.data);
          })
          .catch(error => console.error('Error fetching data:', error));
      }
    }, [date]);
  
    return (
        <div>
            <h1 style={{margin: '10px'}}>Workspaces</h1>
      <div  style={{margin: '10px', display : 'flex', 'justify-content': 'center','align-items': 'center' }}>
        
        <label>
          Select Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        </div>
       <div>
        <div style={{display : 'flex', 'justify-content': 'space-around' }}>
        <label style={{color: "green"}}>
            Frei:
        <ul>
          {workspaces.available.map(ws => (
                <li>{ws.name}</li>
              ))}
        </ul>
        </label>
        <label style={{color: "red"}}>
            Gebucht:
            <ul>
            {workspaces.booked.map(ws => (
                    <li>{ws.name}</li>
                ))}
            </ul>
        </label>
        </div>
      </div>
      </div>
    );
  }

export default Home;
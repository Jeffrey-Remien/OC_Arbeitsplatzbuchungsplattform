import React, { useEffect, useState }  from 'react';
import './Home.css';
import axios from 'axios';
import BookingPopup from './Components/BookingPopup';

function Home() {
    const [workspaces, setWorkspaces] = useState({ available: [], booked: [] });
    const [selectedWorkspace, setSelectedWorkspace] = useState();
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today

    function openPopupPreselectWorkspace (id) {
      setSelectedWorkspace(id);
      document.getElementById("popupTrigger").click();
    }
  
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
        <h1 style={{ margin: '10px' }}>Workspaces</h1>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <label style={{ color: 'green' }}>
              Frei:
              <ul>
                {workspaces.available.map((ws, index) => (
                  <li key={index} onClick={()=>{openPopupPreselectWorkspace (ws.workspace_id)}}>{ws.name}</li>
                ))}
              </ul>
            </label>
            <label style={{ color: 'red' }}>
              Gebucht:
              <ul>
                {workspaces.booked.map((ws, index) => (
                  <li key={index}>{ws.name}</li>
                ))}
              </ul>
            </label>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <BookingPopup type="new" workspaces={workspaces.available} selectedWorkspace={selectedWorkspace}></BookingPopup>
          </div>
        </div>
      </div>
    );
  }
  
    


export default Home;
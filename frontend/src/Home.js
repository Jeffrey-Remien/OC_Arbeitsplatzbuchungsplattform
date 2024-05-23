import React, { useEffect, useState }  from 'react';
import './Home.css';
import axios from 'axios';
import { createBooking } from './util/api';
import BookingPopup from './Components/BookingPopup';

function Home() {
    const [workspaces, setWorkspaces] = useState({ available: [], booked: [] });
    const [selectedWorkspace, setSelectedWorkspace] = useState(null);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today
    const [showPopup, setShowPopup] = useState(false);

    const fetchWorkspaces = async (date) => {
      axios.get(`/api/workspaces/status/day?date=${date}`)
      .then(response => {
        setWorkspaces(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
    };
    
    const handleNewBooking = () => {
      if(workspaces.available.length > 0){
        setSelectedWorkspace(workspaces.available[0].workspace_id); // Select the first available workspace
        setShowPopup(true);
      }
      else {
        alert("Kein Freier Arbeitsplatz zur Buchung an diesem Tag verfügbar")
      }
      
    };

    const handleWorkspaceClick = (workspaceId) => {
      setSelectedWorkspace(workspaceId);
      setShowPopup(true);
    };

    const handleSaveBooking = async (booking) => {
        try {
            const response = await createBooking(booking);
            console.log('Booking created:', response.data);
        } catch (error) {
            console.error('Error creating booking:', error);
            alert("Buchung konnte nicht getätigt werden!");
        }
        fetchWorkspaces(date);
        setShowPopup(false);
    };
  
    useEffect(() => {
      if (date) {
        fetchWorkspaces(date);
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
              <ul className='wplist'>
                {workspaces.available.map((ws, index) => (
                  <li key={index} onClick={()=>{handleWorkspaceClick (ws.workspace_id)}}>{ws.name}</li>
                ))}
              </ul>
            </label>
            <label style={{ color: 'red' }}>
              Gebucht:
              <ul className='wplist'>
                {workspaces.booked.map((ws, index) => (
                  <li key={index}>{ws.name}</li>
                ))}
              </ul>
            </label>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button onClick={handleNewBooking}>Neue Buchung</button>
          </div>
          <BookingPopup show={showPopup} onClose={() => setShowPopup(false)} workspaces={workspaces.available} selectedWorkspace={selectedWorkspace} selectedDate={date} onSave={handleSaveBooking}></BookingPopup>
        </div>
      </div>
    );
  }
  
    


export default Home;
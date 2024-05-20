import React, { useEffect, useState, prop }  from 'react';
import './BookingPopup.css';
import axios from 'axios';
import Popup from 'reactjs-popup';

function BookingPopup(props) {
    const [worspace, setWorkspace] = useState():
    const [from, setFrom] = useState(new Date().toISOString().split('T')[0]); 
    const [to, setTo] = useState(new Date().toISOString().split('T')[0]); 
  
    return (
        <Popup trigger={<button> Trigger</button>} position="center">
            <div style={{backgroundColor: "white"}}>
                <h1>{props.type === 'new' ? 'Neue Buchung' : 'Buchung Bearbeiten'}</h1>
                <div className='centered'>
                    <label>
                        Arbeitsplatz
                        <select 
                            onChange={(e) => setWorkspace(e.target.value)}
                        > 
                            {props.workspaces.map((ws, index) => (
                                <option value={ws.workspace_id}>{ws.name}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className='centered'>
                    <label>
                        Von
                        <input
                        type="date"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        />
                    </label>
                </div>
                <div className='centered'>
                    <label>
                        Bis
                        <input
                        type="date"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        />
                    </label>
                </div>
            </div>
        </Popup>
    );
  }
  
    


export default BookingPopup;
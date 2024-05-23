import React, { useState, useEffect }  from 'react';
import './BookingPopup.css';
import Popup from 'reactjs-popup';

function BookingPopup({ 
    show, 
    onClose, 
    workspaces, 
    selectedWorkspace, 
    selectedBooking, 
    onSave, 
    onDelete 
  }) {


    console.log("POPUP");
    console.log(selectedBooking);
    const [workspace, setWorkspace] = useState(selectedWorkspace || '');
    const [from, setFrom] = useState(selectedBooking ? selectedBooking.start_time : ''); 
    const [to, setTo] = useState(selectedBooking ? selectedBooking.end_time : '');

    console.log(workspace);

    useEffect(() => {
        if (selectedWorkspace) {
            setWorkspace(selectedWorkspace);
        }
        if (selectedBooking) {
            setWorkspace(selectedBooking.workspace_id);
            setFrom(selectedBooking.start_time);
            setTo(selectedBooking.end_time);
        }
    }, [selectedWorkspace, selectedBooking]);

    console.log(workspace);


    if (!show) {
        return null;
    }

    const handleSave = () => {
        const booking = {
          workspace_id: workspace,
          start_time: from,
          end_time: to,
        };
        onSave(booking);
      };
    
    const isEditing = Boolean(selectedBooking);

    return (
        <div className='container'>
            <h1>{!isEditing ? 'Neue Buchung' : 'Buchung Bearbeiten'}</h1>
            <div className='centered'>
                <label>
                    Arbeitsplatz
                    <select 
                        value={workspace}
                        onChange={(e) => {setWorkspace(e.target.value); console.log(e.target.value); console.log(e.target)}}
                    >   
                        {workspaces.map((ws, index) => (
                            <option value={ws.workspace_id} key={ws.workspace_id}>{ws.name}</option> 
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
            <div className='centered'>
                <button onClick={handleSave}>{isEditing ? 'Änderungen speichern' : 'Buchung erstellen'}</button>
                {isEditing && <button onClick={onDelete}>Buchung löschen</button>}
            </div>
            <button className="close-button" onClick={onClose}>Schließen</button>
        </div>
    );
  }
  
    


export default BookingPopup;
import React, { useEffect, useState, prop }  from 'react';
import './BookingPopup.css';
import { createBooking, updateBooking, deleteBooking } from '../util/api';
import Popup from 'reactjs-popup';

function BookingPopup(props) {
    console.log(props);
    const [workspace, setWorkspace] = useState();
    const [from, setFrom] = useState(new Date().toISOString().split('T')[0]); 
    const [to, setTo] = useState(new Date().toISOString().split('T')[0]); 
    
    console.log(props.selectedWorkspace);

    const submitBooking = async () => {
        const booking = {
            user_id: 1, // Replace with actual user ID
            workspace_id: workspace || props.selectedWorkspace || props.workspaces[0].workspace_id,
            start_time: from,
            end_time: to,
        };
        if(!props.bookingId){
            try {
                const response = await createBooking(booking);
                console.log('Booking created:', response.data);
              } catch (error) {
                console.error('Error creating booking:', error);
                alert("Buchung konnte nicht getätigt werden!");
              }
            }
        else {
            try {
                const response = await updateBooking(props.bookingId, booking);
                console.log('Booking updated:', response.data);
            } catch (error) {
                console.error('Error updating booking:', error);
                alert("Buchung konnte nicht aktualisiert werden!");
            }
        }
    };
        

    const cancelBooking = async () => {
        try {
          await deleteBooking(props.bookingId);
          console.log('Booking deleted');
        } catch (error) {
          console.error('Error deleting booking:', error);
          alert("Buchung konnte nicht storniert werden!");
        }
      };
  
    return (
        <Popup trigger={<button id="popupTrigger"> Trigger</button>} position="top center">
            <div className='container'>
                <h1>{!props.bookingId ? 'Neue Buchung' : 'Buchung Bearbeiten'}</h1>
                <div className='centered'>
                    <label>
                        Arbeitsplatz
                        <select 
                            onChange={(e) => {setWorkspace(e.target.value); console.log(e.target.value); console.log(e.target)}}
                        >   
                            {props.workspaces.map((ws, index) => {
                                if (ws.workspace_id === props.selectedWorkspace){(
                                    <option value={ws.workspace_id} selected>{ws.name}</option> 
                                )}
                                else{(
                                    <option value={ws.workspace_id}>{ws.name}</option> 
                                )}
                                
                            })}
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
                    <button onClick={submitBooking}>Buchen</button>
                    {!props.bookingId ? null : (<button onClick={cancelBooking}>Stornieren</button>)}
                </div>
            </div>
        </Popup>
    );
  }
  
    


export default BookingPopup;
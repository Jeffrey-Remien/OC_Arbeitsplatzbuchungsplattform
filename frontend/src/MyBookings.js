import React, { useEffect, useState }  from 'react';
import './MyBookings.css';
import { getUserBookings } from './util/api';
import BookingPopup from './Components/BookingPopup';

function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [selectedWorkspace, setSelectedWorkspace] = useState();


    
    useEffect(() => {
        const fetchBookings = async () => {
        try {
            const response = await getUserBookings();
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching user bookings:', error);
        }
        };

        fetchBookings();
    }, []);

    function openPopupPreselectWorkspace (id) {
      setSelectedWorkspace(id);
      document.getElementById("popupTrigger").click();
    }
  
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };
    
    return (
       <div>
        <h1 style={{ margin: '10px' }}>Meine Buchungen</h1>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <span>Klicke auf eine der Buchungen um sie zu ändern oder zu stornieren.</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <table>
            <thead>
                <tr>
                    <th className="head" >
                        Arbeitsplatz
                    </th>
                    <th className="head" >
                        Von
                    </th>
                    <th className="head" >
                        Bis
                    </th>
                </tr>
            </thead>
            <tbody>
                {bookings.map((bk, index) => (
                  <tr key={index} onClick={()=>{openPopupPreselectWorkspace (bk.booking_id)}}>
                    <td>{bk.workspace_name}</td>
                    <td>{formatDate(bk.start_time)}</td>
                    <td>{formatDate(bk.end_time)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <BookingPopup type="edit" workspaces={[]} selectedWorkspace={selectedWorkspace}></BookingPopup>
        </div>
      </div>
    );
  }
  
    


export default MyBookings;
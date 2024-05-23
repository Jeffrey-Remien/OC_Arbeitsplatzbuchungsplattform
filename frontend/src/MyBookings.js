import React, { useEffect, useState }  from 'react';
import { updateBooking, deleteBooking, getAllWorkspaces } from './util/api';
import './MyBookings.css';
import { getUserBookings } from './util/api';
import BookingPopup from './Components/BookingPopup';

function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [workspaces, setWorkspaces] = useState();
    const [showPopup, setShowPopup] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    const handleBookingClick = (booking) => {
        console.log(booking);
        setSelectedBooking(booking);
        setShowPopup(true);
    };

    const handleSaveBooking = async (booking) => {
        try {
            const response = await updateBooking(selectedBooking.booking_id, booking);
            console.log('Booking updated:', response.data);
        } catch (error) {
            console.error('Error updating booking:', error);
            alert("Buchung konnte nicht aktualisiert werden!");
        }
        setShowPopup(false);
    };

    const handleDeleteBooking = async () => {
        try {
            const response = await deleteBooking(selectedBooking.booking_id);
            console.log('Booking updated:', response.data);
        } catch (error) {
            console.error('Error updating booking:', error);
            alert("Buchung konnte nicht storniert werden!");
        }
        setShowPopup(false);
    };

    
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

    useEffect(()=>{
        const fetchWorkspaces = async () => {
            try{
                const response = await getAllWorkspaces();
                setWorkspaces(response.data);
            } catch (error) {
                console.log('Error fetching workspaces:', error);
            }
        };

        fetchWorkspaces();
        
    }, []);
  
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
                  <tr key={index} onClick={()=>{handleBookingClick (bk)}}>
                    <td>{bk.workspace_name}</td>
                    <td>{formatDate(bk.start_time)}</td>
                    <td>{formatDate(bk.end_time)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <BookingPopup 
                show={showPopup} 
                onClose={() => setShowPopup(false)} 
                workspaces={workspaces} 
                selectedBooking={selectedBooking}
                onSave={handleSaveBooking} 
                onDelete={handleDeleteBooking}
            />
        </div>
      </div>
    );
  }
  
    


export default MyBookings;
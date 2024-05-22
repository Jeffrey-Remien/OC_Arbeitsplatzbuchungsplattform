import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Get workspaces with booking status for a specific date
export const getWorkspaces = (date) => api.get('/workspaces', {params: { date },});
export const createBooking = (booking) => api.post('/bookings', booking);
export const updateBooking = (id, booking) => api.put(`/bookings/${id}`, booking);
export const deleteBooking = (id) => api.delete(`/bookings/${id}`);

export default api;

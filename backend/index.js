const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'postgres',
  database: 'mydatabase',
  password: 'postgres',
  port: 5432,
});

app.get('/api/workspaces', async (req, res) => {
  const result = await pool.query('SELECT * FROM workspaces');
  res.status(200).json(result.rows);
});

app.get('/api/workspaces/status/day', async (req, res) => {
  const { date } = req.query;
  if (!date) {
    return res.status(400).json({ error: 'Date parameter is required' });
  }

  try {
    const result = await pool.query(
      `SELECT
          w.workspace_id,
          w.name,
          w.description,
          CASE
              WHEN b.booking_id IS NULL THEN 'available'
              ELSE 'booked'
          END AS status
       FROM
          workspaces w
       LEFT JOIN
          bookings b
       ON
          w.workspace_id = b.workspace_id
          AND DATE(b.start_time) <= $1
          AND DATE(b.end_time) >= $1`,
      [date]
    );

    const workspaces = result.rows.reduce(
      (acc, ws) => {
        if (ws.status === 'available') {
          acc.available.push(ws);
        } else {
          acc.booked.push(ws);
        }
        return acc;
      },
      { available: [], booked: [] }
    );

    res.status(200).json(workspaces);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new booking
app.post('/api/bookings', async (req, res) => {
  const { user_id, workspace_id, start_time, end_time } = req.body;
  try {
    const newBooking = await pool.query(
      'INSERT INTO bookings (user_id, workspace_id, start_time, end_time) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, workspace_id, start_time, end_time]
    );
    res.status(201).json(newBooking.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an existing booking
app.put('/api/bookings/:id', async (req, res) => {
  const { id } = req.params;
  const {workspace_id, start_time, end_time } = req.body;
  try {
    const updatedBooking = await pool.query(
      'UPDATE bookings SET user_id = 1, workspace_id = $1, start_time = $2, end_time = $3 WHERE booking_id = $4 RETURNING *', //mocking user ID for now
      [ workspace_id, start_time, end_time, id]
    );
    if (updatedBooking.rows.length === 0) {
      res.status(404).json({ error: 'Booking not found' });
    } else {
      res.status(200).json(updatedBooking.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an existing booking
app.delete('/api/bookings/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM bookings WHERE booking_id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Booking not found' });
    } else {
      res.status(204).end();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all bookings for a specific user (mocked user_id for now)
app.get('/api/user/bookings', async (req, res) => {
  const user_id = 1; // Mocked user_id
  try {
    const result = await pool.query(
      `SELECT b.booking_id, b.workspace_id, w.name AS workspace_name, b.start_time, b.end_time 
       FROM bookings b
       JOIN workspaces w ON b.workspace_id = w.workspace_id
       WHERE b.user_id = $1`,
      [user_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

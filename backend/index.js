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

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

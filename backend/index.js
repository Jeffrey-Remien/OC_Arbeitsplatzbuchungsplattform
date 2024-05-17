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
  port: 5433,
});

app.get('/api/workspaces', async (req, res) => {
  const result = await pool.query('SELECT * FROM workspaces');
  res.status(200).json(result.rows);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

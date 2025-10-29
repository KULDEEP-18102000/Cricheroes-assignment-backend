import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getPointsTable, calculateNRR } from './controllers/nrrController.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'IPL NRR Calculator API',
    version: '1.0.0',
    endpoints: {
      'GET /api/points-table': 'Get current points table',
      'POST /api/calculate-nrr': 'Calculate NRR requirements'
    }
  });
});

app.get('/api/points-table', getPointsTable);
app.post('/api/calculate-nrr', calculateNRR);

// Start server
app.listen(PORT, () => {
  console.log(`🏏 Server is running on port ${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}`);
});

export default app;
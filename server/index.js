const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const PORT = process.env.PORT || 6001;

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Fibonacci API',
    version: '1.0.0',
    description: 'API para generar la serie Fibonacci basada en la hora',
  },
  servers: [
    {
      url: `http://localhost:${PORT}`,
      description: 'Servidor local',
    },
  ],
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['./index.js'], // Path to the API docs
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Endpoints
/**
 * @openapi
 * /api/fibonacci:
 *   post:
 *     summary: Genera la serie Fibonacci basada en la hora proporcionada.
 *     description: Devuelve la serie Fibonacci en función de la hora proporcionada. Si no se proporciona hora, usa la hora del servidor.
 *     requestBody:
 *       description: Hora en formato HH:MM:SS (opcional)
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               time:
 *                 type: string
 *                 format: time
 *                 example: "12:23:04"
 *     responses:
 *       200:
 *         description: Serie Fibonacci generada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 series:
 *                   type: array
 *                   items:
 *                     type: integer
 *                 serverTime:
 *                   type: string
 *                   format: time
 *       400:
 *         description: Formato de tiempo inválido
 *       500:
 *         description: Error del servidor
 */
app.post('/api/fibonacci', (req, res) => {
  let serverTime = new Date();
  let x, y, n;

  if (req.body.time && req.body.time.trim() !== '') {
    const { minutes, seconds } = parseTime(req.body.time);
    x = Math.floor(minutes / 10);
    y = minutes % 10;
    n = seconds;
  } else {
    const serverMinutes = serverTime.getMinutes();
    const serverSeconds = serverTime.getSeconds();
    x = Math.floor(serverMinutes / 10);
    y = serverMinutes % 10;
    n = serverSeconds;
  }

  const series = fibonacciSeries(x, y, n);

  res.json({ series, serverTime: serverTime.toLocaleTimeString() });
});

// Function to generate Fibonacci series
function fibonacciSeries(x, y, n) {
  const series = [x, y];
  for (let i = 2; i < n + 2; i++) {
    series.push(series[i - 1] + series[i - 2]);
  }
  return series.reverse();
}

// Function to parse time in HH:mm:ss format
function parseTime(timeString) {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  return { hours, minutes, seconds };
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';

const app: Application = express();

/* ---------------- Security ---------------- */

app.use(helmet());

/* ---------------- CORS ---------------- */

const allowedOrigins = [
  'http://localhost:5173',
  'https://smart-leads-dashboard-lime.vercel.app',
  'https://smart-leads-dashboard-syed-sadains-projects.vercel.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },

    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// handle preflight requests
app.options('*', cors());

/* ---------------- Rate Limit ---------------- */

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
  max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

/* ---------------- Body Parser ---------------- */

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

/* ---------------- Logging ---------------- */

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(
    morgan('combined', {
      stream: {
        write: (message) => logger.info(message.trim()),
      },
    })
  );
}

/* ---------------- Routes ---------------- */

app.use('/api/v1', routes);

/* ---------------- Root ---------------- */

app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Smart Leads Dashboard API',
    version: '1.0.0',
    documentation: '/api/v1/health',
  });
});

/* ---------------- Errors ---------------- */

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
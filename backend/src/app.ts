import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';

const app: Application = express();

/* ---------------- Security Middleware ---------------- */

app.use(helmet());

/* ---------------- CORS Configuration ---------------- */

const allowedOrigins = [
  'http://localhost:5173',
  'https://smart-leads-dashboard-lime.vercel.app',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman/mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('CORS not allowed'));
    },
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

/* ---------------- Rate Limiting ---------------- */

const limiter = rateLimit({
  windowMs: parseInt(
    process.env.RATE_LIMIT_WINDOW_MS || '900000',
    10
  ),
  max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

/* ---------------- Body Parsers ---------------- */

app.use(express.json({ limit: '10mb' }));

app.use(
  express.urlencoded({
    extended: true,
    limit: '10mb',
  })
);

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

/* ---------------- API Routes ---------------- */

app.use('/api/v1', routes);

/* ---------------- Root Route ---------------- */

app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Smart Leads Dashboard API',
    version: '1.0.0',
    documentation: '/api/v1/health',
  });
});

/* ---------------- Error Handling ---------------- */

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
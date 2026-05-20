import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';

const app: Application = express();

/* =========================================================
   Security Middleware
========================================================= */

app.use(helmet());

/* =========================================================
   CORS Configuration
========================================================= */

const allowedOrigins = [
  'http://localhost:5173',

  // OLD Vercel URL
  'https://smart-leads-dashboard-syed-sadains-projects.vercel.app',

  // NEW Vercel URL
  'https://smart-leads-dashboard-l7muhtynk-syed-sadains-projects.vercel.app',

  // Lime URL
  'https://smart-leads-dashboard-lime.vercel.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`));
      }
    },

    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Handle preflight requests
app.options('*', cors());

/* =========================================================
   Rate Limiting
========================================================= */

const limiter = rateLimit({
  windowMs: parseInt(
    process.env.RATE_LIMIT_WINDOW_MS || '900000',
    10
  ),
  max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  message:
    'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

/* =========================================================
   Body Parsers
========================================================= */

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

/* =========================================================
   Logging
========================================================= */

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

/* =========================================================
   API Routes
========================================================= */

app.use('/api/v1', routes);

/* =========================================================
   Root Route
========================================================= */

app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Smart Leads API is running',
    timestamp: new Date().toISOString(),
  });
});

/* =========================================================
   Error Handling
========================================================= */

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
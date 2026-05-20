import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';
import { authenticate, adminOnly } from '../middleware/auth';
import {
  registerValidator,
  loginValidator,
} from '../validators/auth.validators';
import { validate } from '../middleware/validate';

const router = Router();

// Public routes
router.post('/register', registerValidator, validate, AuthController.register);
router.post('/login', loginValidator, validate, AuthController.login);

// Protected routes
router.get('/me', authenticate, AuthController.getMe);
router.get('/users', authenticate, adminOnly, AuthController.getAllUsers);

export default router;

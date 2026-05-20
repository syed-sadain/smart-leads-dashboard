import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import * as AuthService from '../services/auth.service';
import { sendSuccess, sendCreated } from '../utils/apiResponse';

export const register = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await AuthService.registerUser(req.body);
    sendCreated(res, result, 'Account created successfully');
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await AuthService.loginUser(req.body);
    sendSuccess(res, result, 'Login successful');
  } catch (error) {
    next(error);
  }
};

export const getMe = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw new Error('User not authenticated');
    }
    const user = await AuthService.getUserById(req.user.id);
    sendSuccess(res, user, 'User profile retrieved');
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (
  _req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await AuthService.getAllUsers();
    sendSuccess(res, users, 'Users retrieved');
  } catch (error) {
    next(error);
  }
};

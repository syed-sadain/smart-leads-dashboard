import { Response } from 'express';
import { ApiResponse, ValidationError } from '../types';

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message = 'Success',
  statusCode = 200
): Response => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  return res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  message: string,
  statusCode = 500,
  errors?: ValidationError[]
): Response => {
  const response: ApiResponse = {
    success: false,
    message,
    ...(errors && { errors }),
  };
  return res.status(statusCode).json(response);
};

export const sendCreated = <T>(
  res: Response,
  data: T,
  message = 'Created successfully'
): Response => sendSuccess(res, data, message, 201);

export const sendNotFound = (
  res: Response,
  message = 'Resource not found'
): Response => sendError(res, message, 404);

export const sendUnauthorized = (
  res: Response,
  message = 'Unauthorized access'
): Response => sendError(res, message, 401);

export const sendForbidden = (
  res: Response,
  message = 'Forbidden: insufficient permissions'
): Response => sendError(res, message, 403);

export const sendBadRequest = (
  res: Response,
  message: string,
  errors?: ValidationError[]
): Response => sendError(res, message, 400, errors);

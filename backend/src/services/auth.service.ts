import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { IUserPayload, UserRole } from '../types';
import { AppError } from '../middleware/errorHandler';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

interface LoginData {
  email: string;
  password: string;
}

const generateToken = (payload: IUserPayload): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not configured');

  return jwt.sign(payload, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  } as jwt.SignOptions);
};

export const registerUser = async (data: RegisterData) => {
  const { name, email, password, role } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('User with this email already exists', 409);
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || UserRole.SALES,
  });

  const payload: IUserPayload = {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
    name: user.name,
  };

  const accessToken = generateToken(payload);

  return {
    user: payload,
    accessToken,
  };
};

export const loginUser = async (data: LoginData) => {
  const { email, password } = data;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new AppError('Invalid email or password', 401);
  }

  const payload: IUserPayload = {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
    name: user.name,
  };

  const accessToken = generateToken(payload);

  return {
    user: payload,
    accessToken,
  };
};

export const getUserById = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  return user;
};

export const getAllUsers = async () => {
  return User.find().select('-password').sort({ createdAt: -1 });
};

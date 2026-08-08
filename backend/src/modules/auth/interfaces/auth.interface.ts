import { Role, Status, ActivityStatus } from '@prisma/client';

export interface IJwtPayload {
  sub: number;
  email: string;
  role: Role;
  iat?: number;
  exp?: number;
}

export interface IUserResponse {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  role: Role;
  status: Status;
  isEmailVerified: boolean;
  profileImageId?: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface ILoginData {
  user: IUserResponse;
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface ILogActivityOptions {
  userId?: number | null;
  action: string;
  module: string;
  recordId?: number | null;
  description?: string | null;
  status?: ActivityStatus;
  ipAddress?: string | null;
  userAgent?: string | null;
}

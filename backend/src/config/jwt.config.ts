import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const secret = process.env.JWT_SECRET;
  const refreshSecret = process.env.JWT_REFRESH_SECRET;

  if (isProduction) {
    if (!secret || secret === 'coreslash_jwt_secret_key_change_in_production') {
      throw new Error('CRITICAL SECURITY RISK: JWT_SECRET is missing or insecure in production environment!');
    }
    if (!refreshSecret || refreshSecret === 'coreslash_jwt_refresh_secret_key_change_in_production') {
      throw new Error('CRITICAL SECURITY RISK: JWT_REFRESH_SECRET is missing or insecure in production environment!');
    }
    if (secret === refreshSecret) {
      throw new Error('CRITICAL SECURITY RISK: JWT_SECRET and JWT_REFRESH_SECRET must be different secrets!');
    }
  }

  return {
    secret: secret || 'coreslash_jwt_secret_key_change_in_production',
    refreshSecret: refreshSecret || 'coreslash_jwt_refresh_secret_key_change_in_production',
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  };
});

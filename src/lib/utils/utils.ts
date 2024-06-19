import * as crypto from 'crypto';

// Generate a 256-bit secret (32 bytes)
export const generateJWTSecret = () => {
  const secret = crypto.randomBytes(32).toString('hex');
  return secret;
};

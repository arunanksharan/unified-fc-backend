import { JWT_SECRET } from '@/lib/loadenv';

export const jwtConstants: { secret: string } = {
  secret: JWT_SECRET,
};

export const SIGNATURE_ALGORITHM = 'sha256';

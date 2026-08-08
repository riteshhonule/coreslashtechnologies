import * as crypto from 'crypto';

export class HashHelper {
  /**
   * Computes SHA-256 hash of a string (such as a raw refresh token).
   */
  static hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }
}

import { Injectable } from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';

@Injectable()
export class HashingService {
  hash(content: string): string {
    return hashSync(content, 10);
  }

  compare(content: string, encryptedContent: string): boolean {
    return compareSync(content, encryptedContent);
  }
}

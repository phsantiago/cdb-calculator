import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Health check ok!';
  }
  calculateCDB(data): string {
    return 'Health check ok!';
  }
}

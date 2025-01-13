import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findOne(sub: number) {
    throw new Error('Method not implemented.');
  }
}

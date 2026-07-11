import { Inject, Injectable } from '@nestjs/common';
import { DB } from '../db/db.provider';
import { users } from '../db/schema';

@Injectable()
export class UsersService {
  constructor(@Inject(DB) private readonly db: any) {}

  async findAll() {
    return this.db.select().from(users);
  }

  async findUserByUsername(username: string) {
    return this.db.select().from(users).where({ username });
  }

  async createUser(username: string, email: string) {
    return this.db.insert(users).values({
      username,
      email,
    }).returning();
  }
}

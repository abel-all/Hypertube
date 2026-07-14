import { Inject, Injectable } from '@nestjs/common';
import { DB } from '../db/db.provider';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

export interface User {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(@Inject(DB) private readonly db: any) { }

  async findAll() {
    return this.db.select().from(users);
  }

  async findUserByUsername(username: string) {
    const user = this.db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async findUserByEmail(email: string) {
    const user = this.db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser({
    username,
    email,
    firstName,
    lastName,
    password
  }: User) {
    return this.db.insert(users).values({
      username,
      email,
      firstName,
      lastName,
      password
    }).returning();
  }
}

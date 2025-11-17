import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(@Inject('DB_CONNECTION') private db) {}

  async getUsuarios() {
    const [rows] = await this.db.query("SELECT * FROM usuarios");
    return rows;
  }
}

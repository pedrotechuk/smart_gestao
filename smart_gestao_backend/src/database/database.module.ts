import { Module } from '@nestjs/common';
import { createPool } from 'mysql2/promise';

@Module({
  providers: [
    {
      provide: 'DB_CONNECTION',
      useFactory: async () =>
        createPool({
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT),
          user: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
        }),
    },
  ],
  exports: ['DB_CONNECTION'],
})
export class DatabaseModule {}

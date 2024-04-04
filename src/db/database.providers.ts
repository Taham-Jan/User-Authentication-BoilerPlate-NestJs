import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';
import { DB_CONNECTION } from 'src/constants/constant';

export const databaseProviders = [
  {
    provide: DB_CONNECTION,
    useFactory: async (
      configService: ConfigService,
    ): Promise<typeof mongoose> => {
      const connectionString = configService.get<string>('host');
      return mongoose.connect(connectionString);
    },
    inject: [ConfigService],
  },
];

import { Connection } from 'mongoose';
import { UserSchema } from './entities/user.entity';
import { DB_CONNECTION, USER_PROVIDER } from 'src/constants/constant';

export const userProviders = [
  {
    provide: USER_PROVIDER,
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: [DB_CONNECTION],
  },
];

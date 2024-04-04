import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

import { envConfig } from './envConfig';
export default () => {
  const config = plainToClass(envConfig, {
    port: parseInt(process.env.PORT, 10) || 3000,
    host: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtSecretexpiry: process.env.JWT_SECRET_EXPIRY,
  });

  const errors = validateSync(config);

  if (errors.length > 0) {
    throw new Error(
      `Config validation error: ${errors.map((error) => error.toString()).join(', ')}`,
    );
  }

  return config;
};

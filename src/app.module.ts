import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import configuration from 'config/configuration';

@Module({
  // imports: [ConfigModule.forRoot({ load: [configuration], isGlobal: true })],
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      cache: true,
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

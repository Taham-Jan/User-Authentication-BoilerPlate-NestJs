import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import csurf from 'csurf';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(csurf());
  app.use(helmet());
  const configService = app.get(ConfigService);

  const port = configService.get<number>('port');
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();

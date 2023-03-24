import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoreModules } from './core/core.module';
import { ShareModule } from './shared/shared.module';

@Module({
  imports: [CoreModules, ShareModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

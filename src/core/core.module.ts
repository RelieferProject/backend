import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ShareModule } from 'src/shared/shared.module';
import { AuthControllers } from './controllers/auth.controller';
import { CampaignControllers } from './controllers/campaign.controller';
import { ImageControllers } from './controllers/image.controller';
import { UserControllers } from './controllers/user.controller';
import { UserInterceptor } from './interceptors/user.interceptor';
import { AuthServices } from './services/auth.service';

@Module({
  imports: [ShareModule],
  controllers: [
    AuthControllers,
    CampaignControllers,
    ImageControllers,
    UserControllers,
  ],
  providers: [
    AuthServices,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: UserInterceptor,
    // },
  ],
})
export class CoreModules {}

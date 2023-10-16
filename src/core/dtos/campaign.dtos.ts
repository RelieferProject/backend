import { IsNotEmpty } from 'class-validator';

export class CreateCampaignDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  picture: any[];

  @IsNotEmpty()
  startTime: Date;

  @IsNotEmpty()
  endTime: Date;

  @IsNotEmpty()
  durationToEarn: number;

  @IsNotEmpty()
  rewardTokenAmount: number;

  @IsNotEmpty()
  address: string;
}

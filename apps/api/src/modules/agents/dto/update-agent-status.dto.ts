import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAgentStatusDto {
  @IsNotEmpty() @IsString() status: string;
}

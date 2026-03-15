import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';

export class CreateAgentDto {
  @IsNotEmpty() @IsString() name: string;
  @IsNotEmpty() @IsString() role: string;
  @IsOptional() @IsArray() skills?: string[];
}

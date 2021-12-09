import { PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TokenStatus } from 'src/features/shared/interfaces/token-status.interface';
import { CreateTokenDto } from './create-token.dto';

export class UpdateTokenDto extends PartialType(CreateTokenDto) {
    @IsString()
    @IsOptional()
    @IsEnum(TokenStatus)
    public readonly status: string;
}
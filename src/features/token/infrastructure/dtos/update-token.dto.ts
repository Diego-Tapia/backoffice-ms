import { PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ETokenStatus } from 'src/features/token/domain/enums/token-status.enum';
import { CreateTokenDto } from './create-token.dto';

export class UpdateTokenDto extends PartialType(CreateTokenDto) {
    @IsString()
    @IsOptional()
    @IsEnum(ETokenStatus)
    public readonly status: string;
}
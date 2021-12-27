import { Controller, Get, Post, Body, Inject, Param, Request, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ICreateTokenApplication } from 'src/features/token/application/create-token/create-token-app.interface';
import { IEmitTokenApplication } from 'src/features/token/application/emit-token/emit-token-app.interface';
import { IGetAllTokensApplication } from 'src/features/token/application/get-all-tokens/get-all-tokens-app.interface';
import { IGetTokenByIdApplication } from 'src/features/token/application/get-token-by-id/get-token-by-id-app.interface';
import { IReemitTokenApplication } from 'src/features/token/application/reemit-token/reemit-token-app.interface';
import { IUpdateTokenApplication } from 'src/features/token/application/update-token/update-token-app.interface';
import { ReemitTokenDto } from 'src/features/token/infrastructure/dtos/reemit-token.dto';
import { UpdateTokenDto } from 'src/features/token/infrastructure/dtos/update-token.dto';
import { TokenTypes } from 'src/features/token/token.types';
import { CreateTokenDto } from '../../features/token/infrastructure/dtos/create-token.dto';

@ApiTags('token')
@Controller('token')
export class TokenController {
  constructor(
    @Inject(TokenTypes.APPLICATION.CREATE_TOKEN)
    private readonly createTokenApplication: ICreateTokenApplication,
    @Inject(TokenTypes.APPLICATION.UPDATE_TOKEN)
    private readonly updateTokenApplication: IUpdateTokenApplication,
    @Inject(TokenTypes.APPLICATION.GET_ALL_TOKENS)
    private readonly getAllTokensApplication: IGetAllTokensApplication,
    @Inject(TokenTypes.APPLICATION.GET_TOKEN_BY_ID)
    private readonly getTokenByIdApplication: IGetTokenByIdApplication,
    @Inject(TokenTypes.APPLICATION.EMIT_TOKEN)
    private readonly emitTokenApplication: IEmitTokenApplication,
    @Inject(TokenTypes.APPLICATION.REEMIT_TOKEN)
    private readonly reemitTokenApplication: IReemitTokenApplication,
  ) {}

  @Post()
  create(@Body() createTokenDto: CreateTokenDto, @Request() req) {
    return this.createTokenApplication.execute(createTokenDto, req);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTokenDto: UpdateTokenDto, @Request() req) {
    return this.updateTokenApplication.execute(id, updateTokenDto, req);
  }

  @Get()
  findAll(@Request() req) {
    return this.getAllTokensApplication.execute(req);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.getTokenByIdApplication.execute(id);
  }

  @Post(':id/emit')
  emitToken(@Param('id') id: string, @Request() request) {
    return this.emitTokenApplication.execute(id, request)
  }
  
  @Post(':id/reemit')
  reemitToken(@Param('id') id: string, @Body() reemitTokenDto: ReemitTokenDto, @Request() request) {
    return this.reemitTokenApplication.execute(id, reemitTokenDto, request)
  }



}

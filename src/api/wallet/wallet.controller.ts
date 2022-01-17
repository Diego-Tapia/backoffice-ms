import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IGetAllBalancesApplication } from 'src/features/wallet/application/get-all-balances/get-all-balances-app.interface';
import { WalletTypes } from 'src/features/wallet/wallet.type';
import { CreateWalletDto } from '../../features/wallet/infrastructure/dtos/create-wallet.dto';
import { UpdateWalletDto } from '../../features/wallet/infrastructure/dtos/update-wallet.dto';

@ApiTags('wallet')
@Controller('wallet')
export class WalletController {

  constructor(
    @Inject(WalletTypes.APPLICATION.GET_ALL_BALANCES)
    private readonly getAllBalancesApplication: IGetAllBalancesApplication
  ) {}


  @Post()
  create(@Body() createWalletDto: CreateWalletDto) {
    return
  }

  @Get()
  findAll(@Request() req) {
    return this.getAllBalancesApplication.execute(req)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return
  }
}

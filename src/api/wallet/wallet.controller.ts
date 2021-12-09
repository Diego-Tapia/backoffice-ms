import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateWalletDto } from '../../features/wallet/infrastructure/dtos/create-wallet.dto';
import { UpdateWalletDto } from '../../features/wallet/infrastructure/dtos/update-wallet.dto';

@ApiTags('wallet')
@Controller('wallet')
export class WalletController {

  @Post()
  create(@Body() createWalletDto: CreateWalletDto) {
    return
  }

  @Get()
  findAll() {
    return
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

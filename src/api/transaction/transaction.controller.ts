import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateTransactionDto } from '../../features/transaction/infrastructure/dtos/create-transaction.dto';
import { UpdateTransactionDto } from '../../features/transaction/infrastructure/dtos/update-transaction.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
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
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return 
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return
  }
}

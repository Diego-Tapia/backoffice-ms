import { Body, Controller, Get, Inject, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IGetAllIndividualIncrementApplication } from 'src/features/increment/application/get-all-individual-increments/get-all-individual-increment-app.interface';
import { IIndividualIncrementApplication } from 'src/features/increment/application/individual-increment/individual-increment-app.interface';
import { IncrementTypes } from 'src/features/increment/increment.types';
import { IndividualIncrementDto } from 'src/features/increment/infrastructure/dtos/individual-increment.dto';

@ApiTags('increment')
@Controller('increment')
export class IncrementController {
    constructor(
        @Inject(IncrementTypes.APPLICATION.INDIVIDUAL_INCREMENT)
        private readonly individualIncrementApplication: IIndividualIncrementApplication,
        @Inject(IncrementTypes.APPLICATION.GET_ALL_INDIVIDUAL_INCREMENT)
        private readonly getAllIndividualIncrementApplication: IGetAllIndividualIncrementApplication
    ) {}

    @Get('individual')
    findAll() {
        return this.getAllIndividualIncrementApplication.execute()
    }

    @Post('individual')
    create(@Body() individualIncrementDto: IndividualIncrementDto, @Request() request) {
        return this.individualIncrementApplication.execute(individualIncrementDto, request)
    }

}

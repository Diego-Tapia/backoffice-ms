import { Body, Controller, Get, Inject, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IIndividualIncrementApplication } from 'src/features/individual_increment/application/individual-increment/individual-increment-app.interface';
import { IncrementTypes } from 'src/features/individual_increment/increment.types';
import { IndividualIncrementDto } from 'src/features/individual_increment/infrastructure/dtos/individual-increment.dto';

@ApiTags('increment')
@Controller('increment')
export class IncrementController {
    constructor(
        @Inject(IncrementTypes.APPLICATION.INDIVIDUAL_INCREMENT)
        private readonly individualIncrementApplication: IIndividualIncrementApplication,
    ) { }


    @Post('individual')
    create(@Body() individualIncrementDto: IndividualIncrementDto, @Request() request) {
        return this.individualIncrementApplication.execute(individualIncrementDto, request)
    }

}

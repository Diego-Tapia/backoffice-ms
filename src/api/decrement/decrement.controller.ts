import { Body, Controller, Inject, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IIndividualDecrementApplication } from 'src/features/decrement/application/individual-decrement/individual-decrement-app.interface';
import { DecrementTypes } from 'src/features/decrement/decrement.types';
import { IndividualDecrementDto } from 'src/features/decrement/infrastructure/dtos/individual-decrement.dto';

@ApiTags('decrement')
@Controller('decrement')
export class DecrementController {
    constructor(
        @Inject(DecrementTypes.APPLICATION.INDIVIDUAL_DECREMENT)
        private readonly individualDerementApplication: IIndividualDecrementApplication
    ) {}

    @Post('individual')
    create(@Body() individualDecrementDto: IndividualDecrementDto, @Request() request) {
        return this.individualDerementApplication.execute(individualDecrementDto, request)
    }

}

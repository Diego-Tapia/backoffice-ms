import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { CommonTypes } from 'src/features/shared/common/common.types';
import { IHelperService } from 'src/features/shared/common/infrastructure/services/helper-service/helper-service.interface';
import { Massive } from 'src/features/transaction/domain/entities/massive.entity';
import { TransactionTypes } from 'src/features/transaction/transaction.types';
import { IMassiveDecreaseRepository } from '../../../infrastructure/repositories/massive-decrease/massive-decrease-repository.interface';
import { IGetMassiveDecreaseByIdApplication } from './get-massive-decrease-by-id-app.interface';

@Injectable()
export class GetMassiveDecreaseByIdApplication implements IGetMassiveDecreaseByIdApplication {
  constructor(
    @Inject(TransactionTypes.INFRASTRUCTURE.MASSIVE_DECREASE_REPOSITORY)
    private readonly massiveDecreaseRepository: IMassiveDecreaseRepository,
    @Inject(CommonTypes.INFRASTRUCTURE.HELPER_SERVICE)
    private readonly herperService: IHelperService
  ) {}

  public async execute(id: string, request: RequestModel): Promise<Massive> {
    const { clientId } = request.admin;

    if (!this.herperService.isValidObjectId(id)) throw new BadRequestException('id inválido');

    const massiveDecrease = await this.massiveDecreaseRepository.findOne({ _id: id, clientId });
    if (!massiveDecrease) throw new BadRequestException('Decremento masivo no existe');
    
    return massiveDecrease;
  }
}

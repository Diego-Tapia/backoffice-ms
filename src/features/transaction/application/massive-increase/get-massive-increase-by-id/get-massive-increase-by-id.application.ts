import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { CommonTypes } from 'src/features/shared/common/common.types';
import { IHelperService } from 'src/features/shared/common/infrastructure/services/helper-service/helper-service.interface';
import { Massive } from 'src/features/transaction/domain/entities/massive.entity';
import { TransactionTypes } from 'src/features/transaction/transaction.types';
import { IMassiveIncreaseRepository } from '../../../infrastructure/repositories/massive-increase/massive-increase-repository.interface';
import { IGetMassiveIncreaseByIdApplication } from './get-massive-increase-by-id-app.interface';

@Injectable()
export class GetMassiveIncreaseByIdApplication implements IGetMassiveIncreaseByIdApplication {
  constructor(
    @Inject(TransactionTypes.INFRASTRUCTURE.MASSIVE_INCREASE_REPOSITORY)
    private readonly massiveIncreaseRepository: IMassiveIncreaseRepository,
    @Inject(CommonTypes.INFRASTRUCTURE.HELPER_SERVICE)
    private readonly herperService: IHelperService
  ) {}

  public async execute(id: string, request: RequestModel): Promise<Massive> {
    const { clientId } = request.admin;

    if (!this.herperService.isValidObjectId(id)) throw new BadRequestException('id inválido');
    
    const massiveIncrease = await this.massiveIncreaseRepository.findOne({_id: id, clientId});
    if (!massiveIncrease) throw new BadRequestException('Incremento masivo no existe');
    
    return massiveIncrease;
  }
}

import { MassiveIncrease } from '../../domain/entities/massive-increase.entity';
import { MassiveIncreaseDto } from '../../infrastructure/dtos/massive-increase.dto';

export interface ICancelMassiveIncreaseApplication {
  execute(massiveIncreaseDto: MassiveIncreaseDto): Promise<MassiveIncrease>;
}

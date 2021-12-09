import { MassiveDecrease } from '../../domain/entities/massive-decrease.entity';
import { MassiveDecreaseDto } from '../../infrastructure/dtos/massive-decrease.dto';

export interface ICancelMassiveDecreaseApplication {
  execute(massiveDecreaseDto: MassiveDecreaseDto): Promise<MassiveDecrease>;
}

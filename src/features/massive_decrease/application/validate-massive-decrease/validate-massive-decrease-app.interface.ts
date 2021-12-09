import { MassiveDecrease } from '../../domain/entities/massive-decrease.entity';

export interface IValidateMassiveDecreaseApplication {
  execute(massiveDecrease: MassiveDecrease): Promise<MassiveDecrease>;
}

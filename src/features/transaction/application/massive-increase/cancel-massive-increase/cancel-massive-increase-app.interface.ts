import { Massive } from "src/features/transaction/domain/entities/massive.entity";
import { CreateMassiveDto } from "src/features/transaction/infrastructure/dtos/create-massive.dto";

export interface ICancelMassiveIncreaseApplication {
  execute(createMassiveDto: CreateMassiveDto): Promise<Massive>;
}

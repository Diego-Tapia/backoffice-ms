import { Massive } from "src/features/transaction/domain/entities/massive.entity";
import { CreateMassiveDto } from "src/features/transaction/infrastructure/dtos/create-massive.dto";

export interface ICancelMassiveDecreaseApplication {
  execute(createMassiveDto: CreateMassiveDto): Promise<Massive>;
}

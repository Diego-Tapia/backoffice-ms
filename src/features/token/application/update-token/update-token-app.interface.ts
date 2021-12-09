
import { RequestModel } from "src/features/admin/infrastructure/service/middleware/admin.middleware";
import { Token } from "../../domain/entities/token.entity";
import { UpdateTokenDto } from "../../infrastructure/dtos/update-token.dto";

export interface IUpdateTokenApplication {
    execute(id: string, updateTokenDto: UpdateTokenDto, req: RequestModel): Promise<Token>
} 
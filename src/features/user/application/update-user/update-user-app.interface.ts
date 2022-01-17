import { RequestModel } from "src/features/admin/infrastructure/service/middleware/admin.middleware";
import { UserProfile } from "../../domain/entities/user-profile.entity";
import { UpdateUserDto } from "../../infrastructure/dto/update-user.dto";

export interface IUpdateUserApplication {
    execute(id: string, updateUserDto: UpdateUserDto, request: RequestModel) : Promise<UserProfile>;
}
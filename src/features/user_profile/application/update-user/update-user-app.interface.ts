import { UserProfile } from "../../domain/entities/userProfile.entity";
import { UpdateUserProfileDto } from "../../infrastructure/dtos/update-user.dto";

export interface IUpdateUserApplication {
    execute(id: string, updateUserProfileDto: UpdateUserProfileDto) : Promise<UserProfile>;
}
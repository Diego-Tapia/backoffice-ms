import { UserProfile } from "../../domain/entities/userProfile.entity";
import { CreateUserProfileDto } from "../../infrastructure/dtos/create-user.dto";


export interface ICreateUserApplication {
  execute(createUserDto: CreateUserProfileDto): Promise<UserProfile>;
}

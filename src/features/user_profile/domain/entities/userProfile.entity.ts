import { User } from "src/features/user/domain/entities/user.entity";

interface IUserProfile {
  shortName: string;
  lastName: string;
  dni: number;
  cuil: number;
  avatarUrl: string;
  email: string;
  phoneNumber: number;
  userId?: string | User;
  id?: string;
}

export class UserProfile {
  shortName: string;
  lastName: string;
  dni: number;
  cuil: number;
  avatarUrl: string;
  email: string;
  phoneNumber: number;
  userId?: string | User;
  id?: string;

  constructor({
    shortName,
    lastName,
    dni,
    cuil,
    avatarUrl,
    email,
    phoneNumber,
    userId,
    id
  }: IUserProfile) {
    this.shortName = shortName;
    this.lastName = lastName;
    this.dni = dni;
    this.cuil = cuil;
    this.avatarUrl = avatarUrl;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.userId = userId;
    this.id = id;
  }
}

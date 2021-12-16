interface IUserProfile {
  shortName: string;
  lastName: string;
  dni: number;
  cuil: number;
  avatarUrl: string;
  email: string;
  phoneNumber: number;
  userId?: string;
}

export class UserProfile {
  shortName: string;
  lastName: string;
  dni: number;
  cuil: number;
  avatarUrl: string;
  email: string;
  phoneNumber: number;
  userId?: string;

  constructor({
    shortName,
    lastName,
    dni,
    cuil,
    avatarUrl,
    email,
    phoneNumber,
    userId,
  }: IUserProfile) {
    this.shortName = shortName;
    this.lastName = lastName;
    this.dni = dni;
    this.cuil = cuil;
    this.avatarUrl = avatarUrl;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.userId = userId;
  }
}

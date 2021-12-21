interface IAdmin {
  shortName: string;
  lastName: string;
  dni: number;
  cuil: number;
  email: string;
  phoneNumber: number;
  clientId: string;
  username: string;
  avatarUrl: string;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Admin {
  shortName: string;
  lastName: string;
  dni: number;
  cuil: number;
  email: string;
  phoneNumber: number;
  clientId: string;
  username: string;
  avatarUrl: string;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({
    shortName,
    lastName,
    dni,
    cuil,
    email,
    phoneNumber,
    clientId,
    username,
    avatarUrl,
    id,
    createdAt,
    updatedAt,
  }: IAdmin) {
    this.shortName = shortName;
    this.lastName = lastName;
    this.dni = dni;
    this.cuil = cuil;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.clientId = clientId;
    this.username = username;
    this.avatarUrl = avatarUrl;
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

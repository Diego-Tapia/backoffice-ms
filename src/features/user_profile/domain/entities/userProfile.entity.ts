export class UserProfile {
  shortName: string;
  lastName: string;
  dni: number;
  cuil: number;
  avatar_url: string;
  email: string;
  phoneNumber: number;
  userId?: string;


  constructor(
    shortName: string,
    lastName: string,
    dni: number,
    cuil: number,
    avatar_url: string,
    email: string,
    phoneNumber: number,
    userId?: string,

  ) {
    
    this.shortName = shortName;
    this.lastName = lastName;
    this.dni = dni;
    this.cuil = cuil;
    this.avatar_url = avatar_url;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.userId = userId;

  }
}

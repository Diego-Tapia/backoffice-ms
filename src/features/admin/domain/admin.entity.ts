export class Admin {
    shortName: string;
    lastName: string;
    dni: number;
    cuil: number;
    email: string; 
    phoneNumber: number;
    clientId: string;
    username: string;
    id?: string;
  
    constructor(
        shortName: string,
        lastName: string,
        dni: number,
        cuil: number,
        email: string,
        phoneNumber: number,
        clientId: string,
        username: string,
        id?: string,
    ) {
        this.shortName = shortName;
        this.lastName = lastName;
        this.dni = dni;
        this.cuil = cuil;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.clientId= clientId;
        this.username = username;
        this.id = id;
    }
  }
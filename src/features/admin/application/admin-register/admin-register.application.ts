import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IAdminRegisterApplication } from './admin-register-app.interface';
import { AdminTypes } from '../../admin.types';
import { Register } from '../../domain/registerAdmin.entity';
import { AdminRegisterDTO } from '../../infrastructure/dto/admin-register.dto';
import { IAdminRepository } from '../../infrastructure/repositories/admin-repository.interface';
import { Admin } from '../../domain/admin.entity';


@Injectable()
export class AdminRegisterApplication implements IAdminRegisterApplication {
    constructor(
        @Inject(AdminTypes.INFRASTRUCTURE.REPOSITORY)
        private readonly adminRepository: IAdminRepository,
    ) { }

    public async execute(userRegisterDto: AdminRegisterDTO): Promise<any> {
        const { clientId, email, password, dni, shortName, lastName, cuil, phoneNumber, username } =
            userRegisterDto;

        const adminExists = await this.adminRepository.findByDni(dni);

         if (adminExists) {
            throw new ConflictException('DNI is already registered');
        } 

        if (adminExists === null) {
            const userRegister = new Register(username, email, password);
            await this.adminRepository.register(userRegister);

            const admin = new Admin(
                shortName,
                lastName,
                dni,
                cuil,
                email,
                phoneNumber,
                clientId,
                username
            )

            await this.adminRepository.create(admin)

        }
    }
}

import { HttpException, HttpStatus, Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AdminTypes } from 'src/features/admin/admin.types';
import { Admin } from 'src/features/admin/domain/admin.entity';
import { IAdminRepository } from '../../repositories/admin-repository.interface';

export interface RequestModel extends Request {
    admin: Admin
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(
        @Inject(AdminTypes.INFRASTRUCTURE.REPOSITORY)
        private readonly adminRepository: IAdminRepository) { }

    async use(req: RequestModel, res: Response, next: NextFunction) {
        try {
            const tokenArray: string[] = req.headers['authorization'].split(' ');
            const decodedToken = await this.adminRepository.verifyJwt(tokenArray[1]);
            
            const admin: Admin = await this.adminRepository.findOne(decodedToken.admin.username);
            if (admin) {
                req.admin = admin;
                next();
            } else {
                throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
            }
        } catch {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
    }

}
import { HttpException, HttpStatus, Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { User } from 'src/features/user/domain/entities/user.entity';
import { UserTypes } from 'src/features/user/user.types';
import { IUserProfileRepository } from 'src/features/user_profile/infrastructure/repositories/user-repository.interface';
import { UserProfileTypes } from 'src/features/user_profile/user.types';
import { IUserRepository } from '../../repositories/user-reposiory.interface';

export interface RequestModel extends Request {
    user: User
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(
        @Inject(UserProfileTypes.INFRASTRUCTURE.REPOSITORY)
        private readonly userProfileRepository: IUserProfileRepository,
        @Inject(UserTypes.INFRASTRUCTURE.REPOSITORY)
        private readonly userRepository: IUserRepository) { }

    async use(req: RequestModel, res: Response, next: NextFunction) {
     /*    try {
            const tokenArray: string[] = req.headers['authorization'].split(' ');
            const decodedToken = await this.userRepository.jwtService.async(tokenArray[1]);

            const user: User = await this.userRepository.findOne(decodedToken.user.username);
            if (user) {
                req.user = user;
                next();
            } else {
                throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
            }
        } catch {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        } */
    }

}
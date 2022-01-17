import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { isValidObjectId, Connection, Types, ClientSession } from 'mongoose';
import { IHelperService } from './helper-service.interface';


export type IClientSession = ClientSession;

@Injectable()
export class HelperService implements IHelperService {

  constructor(
    @InjectConnection() private readonly connection: Connection
  ) { }

  public isValidObjectId(id: string) {
    return isValidObjectId(id);
  }

  public toObjectId(str: string) {
    return new Types.ObjectId(str);
  }

  public getJSON<T>(props: Partial<T>): object {
    return Object.entries(props).reduce((acc, [key, value]) => (
      acc[key] = value,
      acc
    ), {});
  }

  public async withTransaction(callback: (session: IClientSession) => Promise<any>) {
    return await this.connection.transaction(callback);
  }
}

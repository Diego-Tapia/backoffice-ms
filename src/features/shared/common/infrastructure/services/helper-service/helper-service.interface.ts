import { Types } from 'mongoose';
import { IClientSession } from './helper.service';

export interface IHelperService {
  isValidObjectId(id: string): boolean;
  toObjectId(str: string): Types.ObjectId
  getJSON<T>(props: Partial<T>): object;
  withTransaction(callback: (session: IClientSession) => Promise<any>): Promise<any>;
}
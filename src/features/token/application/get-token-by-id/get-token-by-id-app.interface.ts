import { Token } from '../../domain/entities/token.entity';

export interface IGetTokenByIdApplication {
  execute(id: string): Promise<Token>;
}

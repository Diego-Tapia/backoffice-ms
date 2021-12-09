import { UserProfile } from '../../domain/entities/userProfile.entity';

export interface IGetUserpplication {
  execute(param: string | number): Promise<UserProfile>;
}

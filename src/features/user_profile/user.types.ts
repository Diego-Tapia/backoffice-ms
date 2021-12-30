export const UserProfileTypes = {
  APPLICATION: {
    CREATE_USER: Symbol('CreateUserApplication'),
    GET_ALL_USERS: Symbol('GetAllUsersApplication'),
    GET_USER_BY_ID: Symbol('GetUserByIdApplication'),
    GET_USER: Symbol('GetUserApplication'),
    GET_USER_PROFILE_BY_ID: Symbol('GetUserProfileByUserIdApplication'),
    GET_ALL_USER_PROFILE_BY_CLIENT_ID: Symbol('GetAllUserProfileByClientIdApplication'),
    VALIDATE_USER: Symbol('ValidateUserApplication'),
    UPDATE_USER: Symbol('UpdateUserApplication')
  },
  INFRASTRUCTURE: {
    REPOSITORY: Symbol('UserRepository'),
  },
};

export const UserTypes = {
  APPLICATION: {
    REGISTER_USER: Symbol('RegisterUserApplication'),
    UPDATE_USER: Symbol('UpdateUserApplication'),
    VALIDATE_USER: Symbol('ValidateUserApplication'),
    GET_USER_BY_ID: Symbol('GetUserApplication'),
    GET_ALL_USER: Symbol('GetAllUserApplication'),
  },
  INFRASTRUCTURE: {
    USER_PROFILE_REPOSITORY: Symbol('UserProfileRepository'),
    USER_REPOSITORY: Symbol('UserRepository'),
  },
};

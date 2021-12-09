export const UserTypes = {
  APPLICATION: {
    USER_REGISTER: Symbol('UserRegisterApplication'),
    USER_GET_ALL_BY_CLIENT_ID: Symbol('UserGetAllByClientIdApplication'),
    USER_GET_BY_ID: Symbol('UserGetByIdApplication'),
  },
  INFRASTRUCTURE: {
    REPOSITORY: Symbol('UserRepository'),
  },
};

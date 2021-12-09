export const ClientTypes = {
  APPLICATION: {
    CREATE_CLIENT: Symbol(''),
    GET_ALL_CLIENTS: Symbol(''),
    GET_CLIENT_BY_ID: Symbol(''),
  },
  INFRASTRUCTURE: {
    REPOSITORY: Symbol(''),
  },
};

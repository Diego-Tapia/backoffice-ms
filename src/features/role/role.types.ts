export const RoleTypes = {
    APPLICATION: {
      CREATE: Symbol('CreateRoleApplication'),
      GET_ALL: Symbol('GetAllRoleApplication'),
    },
    INFRASTRUCTURE: {
      REPOSITORY: Symbol('RoleRepository'),
    },
  };
  
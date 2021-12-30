export const AdminTypes = {
    APPLICATION: {
      ADMIN_REGISTER: Symbol('AdminRegisterApplication'),
      ADMIN_CONFIRM: Symbol('AdminConfirmApplication'),
      ADMIN_LOGIN: Symbol('AdminLoginApplication'),
      GET_BY_CLIENT_ID: Symbol('GetAdminByClientIdApplication'),
      GET_BY_ID: Symbol('GetAdminByIdApplication'),
      ADMIN_UPDATE: Symbol('AdminUpdateApplication')
    },
    INFRASTRUCTURE: {
      REPOSITORY: Symbol('AdminRepository'),
    },
  };
  
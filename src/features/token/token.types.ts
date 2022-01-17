export const TokenTypes = {
  APPLICATION: {
    CREATE_TOKEN: Symbol('CreateTokenApplication'),
    GET_ALL_TOKENS: Symbol('GetAllTokensApplication'),
    GET_TOKEN: Symbol('GetTokenApplication'),
    UPDATE_TOKEN: Symbol('UpdateTokenApplication'),
    EMIT_TOKEN: Symbol('EmitTokenApplication'),
    REEMIT_TOKEN: Symbol('ReemitTokenApplication'),
  },
  INFRASTRUCTURE: {
    REPOSITORY: Symbol('TokenRepository'),
  },
};

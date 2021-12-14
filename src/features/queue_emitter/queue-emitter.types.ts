export const QueueEmitterTypes = {
  APPLICATION: {
    EMITTER_TRANSACTION: Symbol('EmitterTransactionApplication')
  },
  INFRASTRUCTURE: {
    SQS_EMITTER_SERVICE: Symbol('SqsEmitterService'),
  },
};

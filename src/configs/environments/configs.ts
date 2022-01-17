import { registerAs } from '@nestjs/config';

export default registerAs('configs', () => ({
  app: {
    port: process.env.PORT,
    env: process.env.ENVIRONMENT
  },
  database: {
    uri: process.env.DB_URI,
  },
  sqs: {
    url_t: process.env.SQS_T_URL,
    accesKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sqs_endpoint_url: process.env.SQS_ENDPOINT_URL,
    region: process.env.REGION
  },
  secret: process.env.SECRET,
  
  cognito: {
    user_pool: process.env.COGNITO_USER_POOL_ID,
    client_id: process.env.COGNITO_CLIENT_ID,
  },
  cognito_user: {	
    user_pool:  process.env.COGNITO_USER_POOL_ID_USER,
    client_id: process.env.COGNITO_CLIENT_ID_USER,
  },
  blockchain_ms: {
    url: process.env.BLOCKCHAIN_URL,
  }
}));

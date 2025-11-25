import * as SibApiV3Sdk from '@getbrevo/brevo';
import { serverEnv } from './server-envs';

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, serverEnv.BREVO_API_KEY as string);

export const brevo = apiInstance;

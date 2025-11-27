import { serverEnv } from '@/config/server-envs';
import * as SibApiV3Sdk from '@getbrevo/brevo';

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, serverEnv.BREVO_API_KEY as string);

export const brevo = apiInstance;

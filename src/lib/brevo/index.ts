import { env } from "@/config/env";
import * as SibApiV3Sdk from "@getbrevo/brevo";

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

apiInstance.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  env.BREVO_API_KEY
);

export const brevo = apiInstance;

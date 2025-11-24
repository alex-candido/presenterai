import { Resend } from "resend";
import { serverEnv } from "./server-envs";

export const resend = new Resend(serverEnv.RESEND_API_KEY as string);

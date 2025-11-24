import { serverEnv } from "@/config/server-envs";
import { Resend } from "resend";

export const resend = new Resend(serverEnv.RESEND_API_KEY as string);

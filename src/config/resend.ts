import { Resend } from "resend";
import { env } from "./envs";

export const resend = new Resend(env.RESEND_API_KEY as string);

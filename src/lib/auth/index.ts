import { prisma } from "@/lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { sendBrevoPasswordResetEmail, sendBrevoVerificationEmail } from "../brevo/actions";

export const auth = betterAuth({
  experimental: { joins: true },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendBrevoVerificationEmail(user, url);
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
  },
  socialProviders: {
    // google: {
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // },
  },
  emailAndPassword: {
    autoSignIn: false,
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await sendBrevoPasswordResetEmail(user, url);
    },
  },
  user: {
    additionalFields: {
      username: {
        type: "string",
        required: true,
      },
      role: {
        type: "string",
        required: false,
      },
    },
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
});

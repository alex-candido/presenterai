import { PasswordResetEmail, VerificationEmail } from "@/components/emails";
import { brevo } from "@/config/brevo";
import { prisma } from "@/config/prisma";
import { render } from "@react-email/render";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({
  // experimental: { joins: true },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      const emailHtml = await render(VerificationEmail({ userName: user.name, verificationUrl: url }));
      try {
        await brevo.sendTransacEmail({
          sender: { email: "alex.candido.tec@gmail.com", name: "Support" },
          to: [{ email: user.email }],
          subject: "Verify your email address",
          htmlContent: emailHtml,
        });
        console.log(`Verification email sent to ${user.email}`);
      } catch (error) {
        console.error(`Failed to send verification email to ${user.email}:`, error);
      }
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true
  },
  socialProviders: {
    // google: {
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // },
  },
  emailAndPassword: {
    autoSignIn: true,
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      const emailHtml = await render(PasswordResetEmail({
          userName: user.name,
          resetUrl: url,
          requestTime: new Date().toLocaleString(),
        }));
      try {
        await brevo.sendTransacEmail({
          sender: { email: "alex.candido.tec@gmail.com", name: "Support" }, 
          to: [{ email: user.email }],
          subject: "Reset your password",
          htmlContent: emailHtml,
        });
        console.log(`Password reset email sent to ${user.email}`);
      } catch (error) {
        console.error(`Failed to send password reset email to ${user.email}:`, error);
      }
    },
  },
  user: {
    additionalFields: {
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

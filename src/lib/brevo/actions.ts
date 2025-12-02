import { PasswordResetEmail, VerificationEmail } from "@/components/emails";
import { render } from "@react-email/render";
import type { User } from "better-auth";
import { brevo } from ".";

export async function sendBrevoVerificationEmail(user: User, verificationUrl: string) {
  const emailHtml = await render(VerificationEmail({ userName: user.name, verificationUrl }));
  try {
    await brevo.sendTransacEmail({
      sender: { email: "alex.candido.tec@gmail.com", name: "Support" },
      to: [{ email: user.email as string }],
      subject: "Verify your email address",
      htmlContent: emailHtml,
    });
    console.log(`Verification email sent to ${user.email}`);
  } catch (error) {
    console.error(`Failed to send verification email to ${user.email}:`, error);
  }
}

export async function sendBrevoPasswordResetEmail(user: User, resetUrl: string) {
  const emailHtml = await render(
    PasswordResetEmail({
      userName: user.name,
      resetUrl,
      requestTime: new Date().toLocaleString(),
    }),
  );
  try {
    await brevo.sendTransacEmail({
      sender: { email: "alex.candido.tec@gmail.com", name: "Support" },
      to: [{ email: user.email as string }],
      subject: "Reset your password",
      htmlContent: emailHtml,
    });
    console.log(`Password reset email sent to ${user.email}`);
  } catch (error) {
    console.error(`Failed to send password reset email to ${user.email}:`, error);
  }
}

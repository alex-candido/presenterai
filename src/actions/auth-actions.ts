import { authClient } from "@/lib/auth/client";

export function authActions() {
  async function signUp(inputData: SignUpInput) {
    const response = await authClient.signUp.email(inputData);
    return response;
  }

  async function signIn(inputData: SignInInput) {
    const response = await authClient.signIn.email(inputData);
    return response;
  }

  async function signOut() {
    const response = await authClient.signOut();
    return response;
  }

  async function resetPassword(inputData: ResetPasswordInput) {
    const response = await authClient.resetPassword(inputData);
    return response;
  }

  async function changePassword(inputData: ChangePasswordInput) {
    const response = await authClient.changePassword(inputData);
    return response;
  }

  async function requestPasswordReset(inputData: RequestPasswordResetInput) {
    const response = await authClient.requestPasswordReset(inputData);
    return response;
  }

  return { 
    signUp, 
    signIn, 
    signOut, 
    resetPassword, 
    changePassword, 
    requestPasswordReset
  };
}

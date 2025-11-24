import { authClient } from "@/server/auth/client";

export function authActions() {
  async function signUp(inputData: SignUpInput) {
    const response = await authClient.signUp.email(inputData);
    return response;
  }

  async function signInCredentials(inputData: SignInInput) {
    const response = await authClient.signIn.email(inputData);
    return response;
  }

  async function signInGoogle() {
    const response = await authClient.signIn.social({
      provider: "google"
    });
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
    return response.data;
  }

  async function requestPasswordReset(inputData: RequestPasswordResetInput) {
    const response = await authClient.requestPasswordReset(inputData);
    return response.data;
  }

  function useSession() {
    const response = authClient.useSession()
    return response;
  }

  return { 
    signUp, 
    signInCredentials, 
    signInGoogle,
    signOut, 
    resetPassword, 
    changePassword, 
    requestPasswordReset,
    useSession
  };
}

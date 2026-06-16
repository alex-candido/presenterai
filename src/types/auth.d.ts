type SignUpInput = {
  name: string;
  email: string;
  password: string;
  image?: string | undefined;
  callbackURL?: string | undefined;
  rememberMe?: boolean | undefined;
};

type SignInInput = {
  email: string;
  password: string;
  callbackURL?: string | undefined;
  rememberMe?: boolean | undefined;
};

type ResetPasswordInput = {
  newPassword: string;
  token?: string | undefined;
};

type ChangePasswordInput = {
  newPassword: string;
  currentPassword: string;
  revokeOtherSessions?: boolean | undefined;
};

type RequestPasswordResetInput = {
  email: string;
  redirectTo?: string | undefined;
};

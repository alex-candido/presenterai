"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/server/auth/client";
import { FaGoogle } from "react-icons/fa";

export function AuthSocialButtons() {
  async function onGoogleSignIn() {
    await authClient.signIn.social({
      provider: "google",
    });
  }

  return (
    <div className="flex items-center w-full gap-2">
      <Button variant="outline" className="w-full" onClick={onGoogleSignIn}>
        <FaGoogle className="mr-2 h-4 w-4" />
        Google
      </Button>
    </div>
  );
}

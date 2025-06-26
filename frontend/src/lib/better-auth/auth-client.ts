import { createAuthClient } from "better-auth/react";
import { SERVER_DOMAIN } from "../env";

export const authClient = createAuthClient({
  baseURL: SERVER_DOMAIN,
});

export const { useSession, signOut } = authClient;

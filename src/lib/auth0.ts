import { Auth0Client } from "@auth0/nextjs-auth0/server";

/**
 * Auth0 client instance for the Daribati application.
 * Configuration is loaded from environment variables:
 *   AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_SECRET, APP_BASE_URL
 */
export const auth0 = new Auth0Client();

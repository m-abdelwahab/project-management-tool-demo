declare namespace NodeJS {
  interface ProcessEnv {
    readonly WORKOS_CLIENT_ID: string;
    readonly WORKOS_API_KEY: string;
    readonly NEXTAUTH_URL: string;
    readonly CALLBACK_URL: string;
    readonly GITHUB_CLIENT_ID: string;
    readonly GITHUB_CLIENT_SECRET: string;
    readonly GOOGLE_CLIENT_ID: string;
    readonly GOOGLE_CLIENT_SECRET: string;
  }
}

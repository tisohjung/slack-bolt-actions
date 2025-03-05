declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SLACK_APP_TOKEN: string;
      SLACK_BOT_TOKEN: string;
    }
  }
}

export {};
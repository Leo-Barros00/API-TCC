declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string | undefined
    SECRET_KEY: string | undefined
    [key: string]: string | undefined
  }
}

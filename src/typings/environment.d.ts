declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string | undefined
    [key: string]: string | undefined
  }
}

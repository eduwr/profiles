declare module "bun" {
  interface Env {
    DB_USER: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    DB_PORT: number;
    DB_NAME: string;
    DATABASE_URL: string;
  }
}

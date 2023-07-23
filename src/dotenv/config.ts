import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '..', '..', '.env') });

interface ENV {
  DB_USER: string;
  DB_PASSWORD: string;
  DB_COLLECTION: string;
  PORT: number;
  JWT_SECRET: string;
}

type Config = ENV;

const getConfig = (): ENV => {
  const { DB_USER, DB_PASSWORD, DB_COLLECTION, PORT, JWT_SECRET } = process.env;
  const parsedPort = PORT ? Number(PORT) : undefined;
  return {
    DB_USER,
    DB_PASSWORD,
    DB_COLLECTION,
    PORT: parsedPort,
    JWT_SECRET,
  };
};

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();
const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;

import * as dotenv from 'dotenv'
import {join} from "path";

dotenv.config({path : join(__dirname, '..', '..', '.env')});

interface ENV {
  DB_USER: string|undefined;
  DB_PASSWORD: string|undefined;
  DB_COLLECTION: string|undefined;
  PORT: number|undefined;
}

interface Config {
  DB_USER: string;
  DB_PASSWORD: string;
  DB_COLLECTION: string;
  PORT: number;
}

const getConfig = (): ENV => {
  return {
    DB_USER : process.env.DB_USER,
    DB_PASSWORD : process.env.DB_PASSWORD,
    DB_COLLECTION : process.env.DB_COLLECTION,
    PORT : process.env.PORT ? Number(process.env.PORT) : undefined
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

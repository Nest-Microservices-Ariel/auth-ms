import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  NATS_SERVERS: string;
}

const envsSchema = joi.object({
  PORT: joi.number().required(),
  NATS_SERVERS: joi.string().required()
})
.unknown(true); // le da la flexibilidad de tener mas definidas

const { error, value } = envsSchema.validate( process.env );

if (error) {
  throw new Error(`Config validation error ${error.message}`);
}

const envsVars: EnvVars = value;

export const envs = {
  port: envsVars.PORT,
  nats_servers: envsVars.NATS_SERVERS
} 
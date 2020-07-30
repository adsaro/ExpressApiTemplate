import { Pool } from 'pg';
import dotenv from 'dotenv';
import { direccionBaseDeDatos } from '../settings';

dotenv.config();

export const pool = new Pool({ connectionString: direccionBaseDeDatos });

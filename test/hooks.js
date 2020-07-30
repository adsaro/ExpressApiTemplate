import { pool } from '../src/models/pool';
import {
  crearTablaMensajes,
  insertarMensaje,
  eliminarTablaMensajes,
} from '../src/utils/queries';

export async function before() {
  const client = await pool.connect();
  await client.query(crearTablaMensajes);
  await client.query(insertarMensaje);
  client.release();
}

export async function after() {
  await pool.query(eliminarTablaMensajes);
  await pool.end();
}

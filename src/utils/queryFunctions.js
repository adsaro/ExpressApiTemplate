import { pool } from '../models/pool';
import {
  insertarMensaje,
  eliminarTablaMensajes,
  crearTablaMensajes,
} from './queries';

export const ejecutarQueries = async (arr) => new Promise((resolve) => {
  const stop = arr.length;
  arr.forEach(async (q, index) => {
    await pool.query(q);
    if (index + 1 === stop) resolve();
  });
});

export const eliminarTablas = () => ejecutarQueries([ eliminarTablaMensajes ]);
export const crearTablas = () => ejecutarQueries([ crearTablaMensajes ]);
export const insertarEnLasTablas = () => ejecutarQueries([ insertarMensaje ]);

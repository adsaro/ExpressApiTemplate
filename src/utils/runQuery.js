import { crearTablas, insertarEnLasTablas } from './queryFunctions';

(async () => {
  await crearTablas();
  await insertarEnLasTablas();
})();

export const crearTablaMensajes = `
DROP TABLE IF EXISTS mensajes;
CREATE TABLE IF NOT EXISTS mensajes (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR DEFAULT '',
  mensaje VARCHAR NOT NULL
  )
  `;

export const insertarMensaje = `
INSERT INTO mensajes(nombre, mensaje)
VALUES ('Jesus', 'primer mensaje'),
      ('Sanchez', 'segundo mensaje')
`;

export const eliminarTablaMensajes = 'DROP TABLE IF EXISTS mensajes;';

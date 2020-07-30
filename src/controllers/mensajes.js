import Model from '../models/model';

const modeloMensajes = new Model('mensajes');
export const paginaDeMensajes = async (req, res) => {
  try {
    const data = await modeloMensajes.select('nombre, mensaje');
    res.status(200).json({ mensajes: data.rows });
  } catch (err) {
    res.status(200).json({ error: err.stack });
  }
};

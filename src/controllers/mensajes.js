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

export const guardarMensaje = async (req, res) => {
  try {
    const resultado = await modeloMensajes.insert('nombre, mensaje', req.body)
    const {id, ...data} = resultado.rows[0]
    res.status(200).json({data, id})
  }catch(err){
    res.status(200).json({ error: err.stack });
  }
}
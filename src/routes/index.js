import express from 'express';
import { indexPage, paginaDeMensajes, guardarMensaje } from '../controllers';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);

indexRouter.get('/mensajes', paginaDeMensajes);

indexRouter.post('/mensajes', guardarMensaje);

export default indexRouter;

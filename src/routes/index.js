import express from 'express';
import { indexPage, paginaDeMensajes } from '../controllers';
const indexRouter = express.Router();

indexRouter.get('/', indexPage);

indexRouter.get('/mensajes', paginaDeMensajes);

export default indexRouter;

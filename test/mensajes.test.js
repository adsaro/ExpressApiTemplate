import { server, BASE_URL } from './setup';

describe('Probando la conexión a la base de datos', () => {
  it('Obtener la lista de mensajes', (done) => {
    server
      .get(`${BASE_URL}/mensajes`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.mensajes[0]).toHaveProperty('nombre');
        done();
      });
  });
});

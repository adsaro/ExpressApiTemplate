import { server, BASE_URL } from './setup';

describe('Test de página inicial', () => {
  it('obtener la url base', (done) => {
    server
      .get(`${BASE_URL}/`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.message).toEqual(
          'Aquí podremos guardar nuestros datos sensibles'
        );
        done();
      });
  });
});

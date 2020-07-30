import { server, BASE_URL } from './setup';
import { before, after } from './hooks';

describe('Probando la conexión a la base de datos', () => {
  beforeEach(before);
  afterAll(after);

  it('Obtener la lista de mensajes', (done) => {
    server
      .get(`${BASE_URL}/mensajes`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.mensajes).toBeDefined();
        done();
      });
  });

  it('Verificar que el enpoint POST regresa status 200', (done) => {
    const data = { nombre: 'José', mensaje: 'Mensaje enviado' };
    server
      .post(`${BASE_URL}/mensajes`)
      .send(data)
      .expect(200)
      .end((err, res) => {
        expect(res.status).toEqual(200);
        done();
      });
  });

  it('Comprobar que el endpoint POST recibe información', (done) => {
    const data = { nombre: 'José', mensaje: 'Mensaje enviado' };
    server
      .post(`${BASE_URL}/mensajes`)
      .send(data)
      .expect(200)
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toEqual(data);
        done();
      });
  });

  it('Comprobar que el endpoint POST devuelve el id del elemento guardado', (done) => {
    const data = { nombre: 'José', mensaje: 'Mensaje enviado' };
    server
      .post(`${BASE_URL}/mensajes`)
      .send(data)
      .expect(200)
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body.id).toBeDefined();
        expect(res.body.id).toBeGreaterThan(0);
        done();
      });
  });

  it('Comprobar que el endpoint POST hace que el conteo de datos aumente', (done) => {
    const data = { nombre: 'José', mensaje: 'Mensaje enviado' };
    let conteo;
    server
      .get(`${BASE_URL}/mensajes`)
      .expect(200)
      .then((res) => {
        expect(res.status).toEqual(200);
        expect(res.body.mensajes.length).toBeDefined();
        conteo = res.body.mensajes.length;
        return server.post(`${BASE_URL}/mensajes`).send(data).expect(200);
      })
      .then((res) => {
        expect(res.status).toEqual(200);
        return server.get(`${BASE_URL}/mensajes`).expect(200);
      })
      .then((res) => {
        expect(res.status).toEqual(200);
        expect(res.body.mensajes.length).toBeGreaterThan(conteo);
        done();
      });
  });
});

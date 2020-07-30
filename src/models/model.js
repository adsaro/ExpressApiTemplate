import { pool } from './pool';

class Model {
  constructor(table) {
    this.pool = pool;
    this.table = table;
    this.pool.on(
      'error',
      (err, client) => `Error, ${err}, en el cliente ${client}`
    );
  }

  async select(columns, clause) {
    let query = `SELECT ${columns} FROM ${this.table}`;
    if (clause) query += clause;
    return this.pool.query(query);
  }

  async insert(columns, values){
    const listaValores = Object.keys(values).map((item, index) => `$${index+1}`).join(', ')
    const texto = `INSERT INTO ${this.table}(${columns}) VALUES (${listaValores}) RETURNING *`
    const valores = Object.values(values)
    return this.pool.query(texto, valores)
  }
}

export default Model;

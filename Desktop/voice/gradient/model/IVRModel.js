const db = require('../utils/database');


module.exports = class Ivr {
  constructor(id, fkuserid, name, data, last_agent, status, created, modified) {
    this.id = id;
    this.fkuserid = fkuserid;
    this.name = name;
    this.data = data;
    this.last_agent = last_agent;
    this.status = status;
    this.created = created;
    this.modified = modified;
  }

  save() {
    return db.execute(
      'INSERT INTO infi_voice_ivr (fkuserid, name, data, last_agent, status, created, modified) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [this.fkuserid, this.name, this.data, this.last_agent, this.status, this.created, this.modified]
    );
  }

  static deleteById(id) {}

  static fetchAll() {
    return db.execute('SELECT * FROM infi_voice_ivr');
  }

  static findById(id) {
    // var val = db.execute('SELECT * FROM infi_voice_ivr WHERE id = ?', [id]);
    return db.execute('SELECT * FROM infi_voice_ivr WHERE id = ?', [id]);

    // return val;

  }
};

'use strict';

const extend = require('lodash').assign;
const mysql  = require('mysql');

function getConnection() {
  return mysql.createConnection(extend({
    database : 'beta'
  }, {
    host     : "207.223.170.56",
    user     : "hsssadmin",
    password : "hesaidshesaidroot"
  }));
}

// [START list]
function list(limit, token, cb) {
  token            = token ? parseInt(token, 10) : 0;
  const connection = getConnection();
  connection.query(
    'SELECT * FROM `sessions` LIMIT ? OFFSET ?', [limit, token],
    (err, results) => {
      if (err) {
        cb(err);
        return;
      }
      const hasMore = results.length === limit ? token + results.length : false;
      cb(null, results, hasMore);
    }
  );
  connection.end();
}
// [END list]

// [START create]
function create(data, cb) {
  console.log(data, cb, 'create');
  const connection = getConnection();
  connection.query('INSERT INTO `sessions` SET ?', data, (err, res) => {
    if (err) {
      cb(err);
      return;
    }
    read(res.insertId, cb);
  });
  connection.end();
}
// [END create]

function read(id, cb) {
  const connection = getConnection();
  connection.query(
    'SELECT * FROM `sessions` WHERE `id` = ?', id, (err, results) => {
      if (err) {
        cb(err);
        return;
      }
      if (!results.length) {
        cb({
          code    : 404,
          message : 'Not found'
        });
        return;
      }
      cb(null, results[0]);
    });
  connection.end();
}

// [START update]
function update(id, data, cb) {
  console.log('updating', id, data);
  const connection = getConnection();
  connection.query(
    'UPDATE `sessions` SET ? WHERE `id` = ?', [data, id], (err) => {
      if (err) {
        cb(err);
        return;
      }
      read(id, cb);
    });
  connection.end();
}
// [END update]

function _delete(id, cb) {
  const connection = getConnection();
  connection.query('DELETE FROM `sessions` WHERE `id` = ?', id, cb);
  connection.end();
}

module.exports = {
  createSchema : createSchema,
  list         : list,
  create       : create,
  read         : read,
  update       : update,
  delete       : _delete
};

if (module === require.main) {
  const prompt = require('prompt');
  prompt.start();

  console.log(
    `Running this script directly will allow you to initialize your mysql database.
    This script will not modify any existing tables.`);

  prompt.get(['host', 'user', 'password'], (err, result) => {
    if (err) {
      return;
    }
    createSchema(result);
  });
}

function createSchema(config) {
  const connection = mysql.createConnection(extend({
    multipleStatements : true
  }, config));

  connection.query(
    `CREATE DATABASE IF NOT EXISTS \`beta\`
      DEFAULT CHARACTER SET = \'utf8\'
      DEFAULT COLLATE \'utf8_general_ci\';
    USE \`beta\`;
    CREATE TABLE IF NOT EXISTS \`beta\`.\`sessions\` (
      \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
      \`meantMoreThanYouSaid\` TEXT NULL,
      \`overStatedWhatYouSaid\` TEXT NULL,
      \`emailAddress\` VARCHAR(40) NULL,
      \`emailProvidedFrom\` VARCHAR(40) NULL,
      \'lastSide\' VARCHAR(40) NULL,
      \'lastDeck\' VARCHAR(40) NULL,
      \'returningSession\' ENUM('false', 'true') NOT NULL DEFAULT 'false',
      \`createdAt\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (\`id\`));`,
    (err) => {
      if (err) {
        throw err;
      }
      console.log('Successfully created schema');
      connection.end();
    }
  );
}
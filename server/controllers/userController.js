const uuidv4 = require('uuid/v4');

const bcrypt = require ('bcryptjs');
const SALT_WORK_FACTOR = 10;

const pool = require ('./db');

userController = {};

userController.createUser = (req, res, next) => {
  let { username, password } = req.body;
  password = bcrypt.hashSync(password, SALT_WORK_FACTOR);
  pool.query(`
    INSERT INTO users (name, password)
    VALUES ($1, $2)
    RETURNING *
  `, [ username, password ])
  .then(resp => {
    console.log('row after creating user', resp.rows[0]);
    res.locals.user = resp.rows[0];
    res.locals.ssid = uuidv4();
    res.cookie('ssid', res.locals.ssid, { httpOnly: true });
    next();
  })
  .catch(err => {
    console.error(err.stack);
    next('DB create user error');
  })
}

userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  pool.query(`
      SELECT * FROM users
      WHERE name=$1
    `, [username])
    .then(resp => {
      if (resp.rows[0] && bcrypt.compareSync(password, resp.rows[0].password)) {
        res.locals.ssid = uuidv4();
        res.locals.user = resp.rows[0];
        next();
      } else {
        res.status(401).send('Incorrect username/password');
      }
    })
    .catch(err => {
      console.error(err.stack);
      next('DB verify user error');
    })
}

userController.logoutUser = (req, res, next) => {
  console.log('logging out');
}

module.exports = userController;
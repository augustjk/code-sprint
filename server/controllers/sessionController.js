const redis = require('redis');
client = redis.createClient(); //can take port, host

client.on('connect', ()=>{
  console.log('Connected to Redis.');
});

sessionController = {};

sessionController.createSession = (req, res, next) => {
  client.hmset(res.locals.ssid, res.locals.user);
  client.expire(res.locals.ssid, 300);
  return next();
}

sessionController.verifySession = (req, res, next) => {
  const { ssid } = req.cookies;
  client.get(ssid, (err, resp) => {
    if (err) console.log(err);
    if (resp) {
      console.log('verifying session, resp:', resp);
      res.json(resp);
    } else {
      next();
    }
  })
}

module.exports = sessionController;
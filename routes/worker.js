const express = require('express');

const router = express.Router();
const Worker = require('../controllers/worker');
const helper = require('../helpers/verify');
const passport = require('passport');

router.post('/create', Worker.create);

router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const user = req.user;
  res.send(user);
  // console.log('login route', user);
});

router.get('/no-item/:itemId', helper.isLogin, Worker.getWorkerThatHasNoItemYet);
router.get('/no-admin', helper.isLogin, Worker.getWorkersWithoutAdmin);
router.get('/all/item/:itemId', helper.isLogin, Worker.getAllWorkersDataAtOneItem);

module.exports = router;

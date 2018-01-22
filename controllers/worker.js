const models = require('../models');
const bcrypt = require('bcrypt');
const helper = require('../helpers/verify');

const methods = {};

methods.create = (req, res, next) => {
  if (!req.body.password && !req.body.email && !req.body.name && !req.body.role) {
    res.json({ msg: 'email, password, name, role tidak boleh kosong', ok: false });
  } else if (!req.body.email) {
    res.json({ msg: 'email tidak boleh kosong', ok: false });
  } else if (!req.body.name) {
    res.json({ msg: 'name tidak boleh kosong', ok: false });
  } else if (!req.body.role) {
    res.json({ msg: 'role tidak boleh kosong', ok: false });
  } else if (!req.body.password) {
    res.json({ msg: 'password tidak boleh kosong', ok: false });
  } else {
    models.Worker.findOne({
      where: { email: req.body.email.trim() },
    })
    .then((user) => {
      if (!user) {
        if (req.body.password.length < 6) {
          res.json({ msg: { context: 'Gagal Registeer', content: 'password tidak boleh kurang dari enam karakter' }, ok: false });
        } else if (req.body.role !== 'staff' && req.body.role !== 'asmen' && req.body.role !== 'manager' && req.body.role !== 'admin') {
          res.json({ msg: `pekerja tidak bisa memiliki role ${req.body.role}`, ok: false });
        } else {
          const salt = bcrypt.genSaltSync(10);
          const email = req.body.email.trim();
          const name = req.body.name.trim();
          const role = req.body.role.trim();
          const password = bcrypt.hashSync(req.body.password, salt);
          models.Worker.create({
            name,
            role,
            email,
            password,
          })
        .then((registeredUser) => {
          res.json({ registeredUser, msg: 'berhasil register user baru dengan email unik', ok: true });
        });
        }
      } else {
        res.json({ msg: 'gagal registrasi user baru karena email sudah dipakai', ok: false });
      }
    });
  }
};

methods.login = (email, password, next) => {
  models.Worker.findOne({
    where: { email },
  })
  .then((user) => {
    if (!user) {
      next(null, { ok: false, msg: { context: 'Gagal Login', content: 'Email tidak ditemukan' } });
    } else if (bcrypt.compareSync(password, user.password)) {
      // console.log(user);
      const userData = Object.assign({ name: user.name, role: user.role, id: user.id, ok: true });
      next(null, { msg: { context: 'Berhasil Login', content: 'Selamat datang' }, token: helper.auth(userData), ok: true, user: userData });
    } else {
      next(null, { msg: { context: 'Gagal Login', content: 'Maaf password Anda salah. Silakan coba lagi.' }, ok: false });
    }
  });
};

methods.getWorkerThatHasNoItemYet = (req, res, next) => {
  const itemId = req.params.itemId;
  if (!req.headers.token) {
    res.json({ msg: 'butuh jwt token untuk mengupdate nama unit', ok: false });
  } else {
    models.Item.findOne({
      where: {
        id: itemId,
      },
    })
    .then((item) => {
      if (!item) {
        res.json({ msg: `tidak ada item dengan id ${itemId}`, ok: false });
      } else {
        models.Worker.findAll()
        .then((workers) => {
          const workerDataForDropdown = [];
          const admin = [];
          workers.map((val) => {
            const obj = {};
            if (val.role !== 'admin') {
              obj.text = val.name;
              obj.value = val.id;
              workerDataForDropdown.push(obj);
            }
          });
          item.getWorkers()
          .then((itemWithWorkers) => {
            const filteredWorker = workerDataForDropdown
            .filter(ori => itemWithWorkers
              .filter(compare => (compare.name === ori.text)).length === 0);
            res.json({ item, filteredWorker });
          });
        });
      }
    });
  }
};

methods.getWorkersWithoutAdmin = (req, res, next) => {
  if (!req.headers.token) {
    res.json({ msg: 'butuh jwt token untuk mendapatkan data pekerja', ok: false });
  } else {
    models.Worker.findAll({
      where: {
        role: {
          $not: 'admin'
        }
      },
      attributes: [['name', 'text'], ['name', 'value']]
      // { exclude: ['password', 'email', 'createdAt', 'updatedAt', 'role'] }
    })
    .then(workers => {
      const allItemValue = {
        text: 'semua',
        value: 'semua'
      };
      workers.push(allItemValue);
      res.json({ ok: true, workers });
    });
  }
};

methods.getAllWorkersDataAtOneItem = (req, res, next) => {
  if (!req.headers.token) {
    res.json({ msg: 'butuh jwt token untuk mendapatkan data pekerja', ok: false });
  } else {
    models.Item.findOne({
      where: {
        id: req.params.itemId,
      },
      include: [{
        model: models.Worker,
        attributes: {
          exclude: ['password', 'email', 'createdAt', 'updatedAt'],
        },
        order: [['name', 'ASC']],
        include: [{
          model: models.Bobot,
        },
        {
          model: models.Performance,
          // where: {
          //   itemId: models.Sequelize.col('item.id'),
          // },
        },
        ],
      }],
    })
    .then((workerRef) => {
      res.json({ workerRef, ok: true });
    });
  }
};

module.exports = methods;

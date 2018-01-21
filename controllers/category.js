const models = require('../models');

const methods = {};

methods.assignToItem = (req, res, next) => {
  if (!req.headers.token) {
    res.json({ msg: 'butuh jwt token untuk mendaftarkan kategori baru pada item', ok: false });
  } else {
    const categoryId = req.body.categoryId;
    models.Item.findOne({
      include: [{
        model: models.Category,
      }],
      where: {
        id: req.body.itemId,
      },
    })
    .then((items) => {
      if (items === null) {
        res.json({ msg: `tidak ditemukan item dengan id ${req.body.itemId}`, ok: false });
      } else {
        models.Category.findAll()
        .then((categories) => {
          const filteredCategory =
          categories.filter(category => category.id === Number.parseInt(categoryId, 10));
          if (filteredCategory.length < 1) {
            res.json({ msg: `tidak bisa update kategori pada item ${items.name} karena tidak ada kategori dengan id ${categoryId}`, ok: false });
          } else {
            items.update({
              CategoryId: categoryId,
            })
            .then((updatedItem) => {
              res.json({ msg: `item ${updatedItem.name} sekarang masuk ke kategori '${filteredCategory[0].name}'`, filteredCategory, ok: true });
            });
          }
        });
      }
    });
  }
};

methods.delete = (req, res, next) => {
  if (!req.headers.token) {
    res.json({ msg: 'butuh jwt token untuk menghapus kategori pada item', ok: false });
  } else {
    models.Category.findOne({
      where: {
        id: req.params.categoryId,
      },
    })
    .then((category) => {
      if (category === null) {
        res.json({ msg: `tidak ada kategori dengan id ${req.params.categoryId}` });
      } else {
        category.destroy()
        .then(() => {
          res.json({ category, msg: `category dengan id ${req.params.categoryId} berhasil di hapus`, ok: true });
        });
      }
    });
  }
};

methods.gets = (req, res, next) => {
  if (!req.headers.token) {
    res.json({ msg: 'butuh jwt token untuk menambah kategori pada item', ok: false });
  } else {
    models.Category.findAll({
      // include: [{
      //   model: models.Item,
      //   include: [{
      //     model: models.Bobot,
      //   }],
      // }],
    })
    .then((categories) => {
      res.json({ categories, msg: 'berhasil dapatkan data semua kategori', ok: true });
    });
  }
};

methods.assignCatToTop = (req, res, next) => {
  const name = req.body.name;
  const categoryId = req.body.categoryId;
  const topCategoryId = req.body.topCategoryId;
  if (!req.headers.token) {
    res.json({ msg: 'butuh jwt token untuk menambat kategori pada top kategori', ok: false });
  } else {
    models.Category.findOne({
      where: {
        id: categoryId,
      },
      include: [{
        model: models.Item,
        include: [{
          model: models.Bobot,
        }],
      }],
    })
    .then((category) => {
      if (category === null) {
        res.json({ msg: `tidak ada kategori dengan id ${categoryId}`, ok: false });
      } else {
        models.TopCategory.findOne({
          where: {
            id: topCategoryId,
          },
        })
        .then((topCatRef) => {
          if (topCatRef === null) {
            res.json({ ref: 140, category, msg: `tidak ada top kategori dengan id ${topCategoryId}`, ok: false });
          } else {
            category.getTopCategories()
            .then((topCat) => {
              if (topCat.length < 1) {
                models.CategoryTop.create({
                  categoryId,
                  topCategoryId,
                })
                .then(() => {
                  res.json({ msg: 'sukses', ok: true });
                });
              //   const raw = category.Items.map(item => item.Bobots.map(bobot => bobot));
              //   const bobotsInItems = raw.reduce((acc, cur) => acc.concat(cur), []);
              //   const sum = [];
              //   bobotsInItems.forEach((item) => {
              //     if (!this[item.WorkerId]) {
              //       this[item.WorkerId] = { workerId: item.WorkerId, value: 0 };
              //       sum.push(this[item.WorkerId]);
              //     }
              //     this[item.WorkerId].value += item.value;
              //   }, Object.create(null));
              //   models.TopCategory.findOne({
              //     where: {
              //       id: topCategoryId,
              //     },
              //   })
              //   .then((topId) => {
              //     models.CategoryTop.create({
              //       categoryId,
              //       topCategoryId,
              //     });
              //     sum.forEach((each) => {
              //       models.BobotSum.create({
              //         topCategoryId: topId.id,
              //         workerId: each.workerId,
              //         value: each.value,
              //       });
              //     });
                // });
              //   res.json({ ref: 170, bobotsInItems, topCat, sum });
              } else if (topCat[0].CategoryTop.topCategoryId
              !== Number.parseInt(topCategoryId, 10)) {
                models.CategoryTop.update({
                  topCategoryId: req.body.topCategoryId,
                },
                  {
                    where: {
                      categoryId: req.body.categoryId,
                      $and: {
                        topCategoryId: topCat[0].CategoryTop.topCategoryId,
                      },
                    },
                  })
                  .then(() => {
                    res.json({ ref: '157-category', msg: 'berhasil memperbarui top kategori untuk kategori ini', ok: true });
                  });
              } else {
                res.json({ msg: 'sama' });
                // category.getTopCategories()
                // .then((refTopCat) => {
                //   const raw = category.Items.map(item => item.Bobots.map(bobot => bobot));
                //   const bobotsInItems = raw.reduce((acc, cur) => acc.concat(cur), []);
                //   const sum = [];
                //   bobotsInItems.forEach((item) => {
                //     if (!this[item.WorkerId]) {
                //       this[item.WorkerId] = { workerId: item.WorkerId, value: 0 };
                //       sum.push(this[item.WorkerId]);
                //     }
                //     this[item.WorkerId].value += item.value;
                //   }, Object.create(null));
                //   models.TopCategory.findOne({
                //     where: {
                //       id: topCategoryId,
                //     },
                //   })
                //   .then((topId) => {
                //     sum.forEach((each) => {
                //       models.BobotSum.create({
                //         topCategoryId: topId.id,
                //         workerId: each.workerId,
                //         value: each.value,
                //       });
                //     });
                //   });
                //   res.json({ bobotsInItems, refTopCat, sum });
                // });
              }
            });
          }
        });
      }
    });
  }
};

methods.edit = (req, res, next) => {
  if (!req.headers.token) {
    res.json({ msg: 'butuh jwt token untuk mengedit kategori pada item', ok: false });
  } else {
    models.Category.findOne({
      where: {
        id: req.params.categoryId,
      },
    })
    .then((category) => {
      if (category === null) {
        res.json({ msg: `tidak ada kategori dengan id ${req.params.categoryId}`, ok: false });
      } else {
        category.update({
          name: req.body.name || category.name,
        })
        .then((updatedCat) => {
          res.json({ updatedCat, msg: 'test', ok: true });
        });
      }
    });
  }
};

methods.createTop = (req, res, next) => {
  const name = req.body.name;
  if (!req.headers.token) {
    res.json({ msg: 'butuh jwt token untuk membuat top kategori baru', ok: false });
  } else {
    models.TopCategory.findOne({
      where: {
        name,
      },
    })
    .then((topCat) => {
      if (topCat === null) {
        models.TopCategory.create({
          name,
        })
        .then((topCatRef) => {
          res.json({ topCatRef, msg: 'berhasil membuat top kategori baru', ok: true });
        });
      } else {
        res.json({ msg: `gagal karena sudah ada top kategori dengan nama ${name}`, ok: false });
      }
    });
  }
};

methods.getsTopCategory = (req, res, next) => {
  if (!req.headers.token) {
    res.json({ msg: 'butuh jwt token untuk membuat top kategori baru', ok: false });
  } else {
    models.TopCategory.findAll({
      include: [{
        model: models.Category,
        include: [{
          model: models.Item,
          include: [{
            model: models.Bobot,
          }],
        }],
      },
      {
        model: models.Worker,
      },
      ],
    })
    .then((topCategories) => {
      res.json({ topCategories });
    });
  }
};

methods.create = (req, res, next) => {
  if (!req.headers.token) {
    res.json({ msg: 'butuh jwt token untuk membuat top kategori baru', ok: false });
  } else {
    models.Category.findOne({
      where: {
        name: {
          $iLike: req.body.name,
        },
      },
    })
    .then((category) => {
      if (category === null) {
        if (!req.body.name) {
          res.json({ msg: 'input nama kategori tidak boleh kosong', ok: false });
        } else {
          models.Category.create({
            name: req.body.name,
          })
          .then((uniqCategory) => {
            res.json({ uniqCategory, msg: 'sukses membuat kategori baru', ok: true });
          });
        }
      } else {
        res.json({ msg: `nama kategori harus unik. sudah ada kategori dengan nama ${category.name}`, ok: false });
      }
    });
  }
};

methods.getCategoriesForFilteringItem = (req, res, next) => {
  if (!req.headers.token) {
    res.json({ msg: 'butuh jwt token untuk mengambil data kategori', ok: false });
  } else {
    models.Category.findAll({
      attributes: [['name', 'text'], ['id', 'value']],
    })
    .then((categories) => {
      const noCategory = {
        value: 0,
        text: 'tidak ada kategori',
      };
      const allCategory = {
        value: 'semua',
        text: 'semuanya',
      };
      categories.push(noCategory, allCategory);
      res.json({ ok: true, categories });
    });
  }
};

module.exports = methods;

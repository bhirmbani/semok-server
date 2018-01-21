const express = require('express');

const router = express.Router();
const Category = require('../controllers/category');
const helper = require('../helpers/verify');

router.post('/item', helper.isLogin, Category.assignToItem);
router.post('/', helper.isLogin, Category.create);
router.post('/top', helper.isLogin, Category.createTop);
router.post('/top/assign', helper.isLogin, Category.assignCatToTop);
router.delete('/:categoryId', helper.isLogin, Category.delete);
router.put('/:categoryId', helper.isLogin, Category.edit);
router.get('/', helper.isLogin, Category.gets);
router.get('/top', helper.isLogin, Category.getsTopCategory);
router.get('/for-filtering-item', helper.isLogin, Category.getCategoriesForFilteringItem);

module.exports = router;

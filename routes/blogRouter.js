const express = require('express');
const router = express.Router();
const controller = require('../controllers/blogController');

router.get('/', controller.showList)
router.get('/category/:id', controller.showCategoryBlog)
router.get('/tag/:id', controller.showTagBlog)
router.get('/search/:search', controller.showSearchResult)
router.get('/detail/:id', controller.showDetails)
module.exports = router;


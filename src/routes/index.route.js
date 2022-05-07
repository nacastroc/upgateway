var express = require('express');
var router = express.Router();
const modelService = require('../services/models.service')
const { query } = require('express-validator')
const middlewareService = require('./../services/middleware.service')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'upgateway' });
});

router.get('/api/:model(gateways|peripherals)',
  query('page').optional().isNumeric(),
  query('limit').optional().isNumeric(),
  middlewareService.order(),
  middlewareService.search(),
  async function (req, res, next) {
    try {
      const result = await modelService.list(req.params.model, req.query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

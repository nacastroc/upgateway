var express = require('express');
var router = express.Router();
const modelService = require('./../services/models.service')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'upgateway' });
});

router.get('/:model(gateways|peripherals)',
  async function (req, res, next) {
    try {
      const model = req.params.model === 'gateways' ? 'Gateway' : 'Peripheral';
      const result = await modelService.list(model, req.query);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
)

router.get('/:model(gateways|peripherals)/:id',
  async function (req, res, next) {
    try {
      const model = req.params.model === 'gateways' ? 'Gateway' : 'Peripheral';
      const result = await modelService.view(model, req.params.id);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;

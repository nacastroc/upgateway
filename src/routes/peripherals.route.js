var express = require('express');
var router = express.Router();
const { body, param } = require('express-validator');
const db = require('../models');
const model = 'Peripheral';
const modelService = require('../services/models.service');

router.get('/:id',
    param('id').isNumeric(),
    async function (req, res, next) {
        try {
            const result = await db[model].findByPk(req.params.id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
)

router.post('/',
    body('vendor').not().isEmpty().trim(),
    body('date').isDate(),
    body('status').optional().isBoolean(),
    body('gateway').isUUID(4),
    modelService.check(),
    async (req, res, next) => {
        try {
            const data = await modelService.save(model, req.body);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
)

router.put('/:id',
    param('id').isNumeric(),
    body('vendor').optional().not().isEmpty().trim(),
    body('date').optional().isDate(),
    body('status').optional().isBoolean(),
    async (req, res, next) => {
        try {
            if (req.body.hasOwnProperty('gateway')) delete req.body.gateway;
            const data = await modelService.save(model, req.body, req.params.id);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
)

router.delete('/:id',
    param('id').isNumeric(),
    async function (req, res, next) {
        try {
            const result = await modelService.destroy(model, req.params.id);
            res.json(result)
        } catch (error) {
            next(error);
        }
    }
)

module.exports = router;

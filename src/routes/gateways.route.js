var express = require('express');
var router = express.Router();
const { body, param } = require('express-validator');
const db = require('../models');
const model = 'Gateway';
const modelService = require('../services/models.service');

router.get('/:serial',
    param('serial').isUUID(4),
    async function (req, res, next) {
        try {
            const result = await modelService.find(model, req.params.serial);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
)

router.post('/',
    body('name').not().isEmpty().trim(),
    body('address').not().isEmpty().trim().isIP(4),
    async (req, res, next) => {
        try {
            const data = await modelService.save(model, req.body);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
)

router.put('/:serial',
    param('serial').isUUID(4),
    body('name').optional().not().isEmpty().trim(),
    body('address').optional().not().isEmpty().trim().isIP(4),
    async (req, res, next) => {
        try {
            const data = await modelService.save(model, req.body, req.params.serial);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
)

router.delete('/:serial',
    param('serial').isUUID(4),
    async function (req, res, next) {
        try {
            const result = await modelService.destroy(model, req.params.serial);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
)

module.exports = router;

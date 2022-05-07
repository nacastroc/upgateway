const db = require('../models');
const Op = db.Sequelize.Op;
const modelService = require('./models.service');

/**
 * Checks if the gateway for a peripheral being created is full.
 * @returns - next middleware.
 */
const check = () => {
    return async (req, res, next) => {
        try {
            const gateway = await db['Gateway'].findOne({
                where: { serial: req.body.gateway },
                include: [{ association: 'Peripherals', required: false }]
            });
            if (gateway) {
                if (gateway.Peripherals && gateway.Peripherals.length >= 10) {
                    next(new Error('Gateway full'));
                } else {
                    next();
                }
            } else {
                next(new Error('Gateway not found'));
            }
        } catch (error) {
            next(error);
        }
    }
}

/**
     * Middleware query parser that makes a sequelize order object<br>
     *   The url query <code>?date:desc,order=name:asc</code>
     *   will be converted to a sequelize order object
     *   @example
     *   ```js
     *   [
     *      [db.Sequelize.col('date'), 'DESC'],
     *      [db.Sequelize.col('name'), 'ASC']
     *   ]
     *   ```
     */
const order = () => (req, res, next) => {
    let order = [
        [
            db.Sequelize.col('createdAt'),
            'DESC',
        ]];
    const rawOrder = req.query.order || '';
    if (!!rawOrder) {
        order = rawOrder.split(',').map(row => {
            const items = row.split(':');
            return [
                db.Sequelize.col(items[0]),
                items[1],
            ];
        });
    }
    req.query.order = order;
    next();
}

/**
 * Middleware that searches through a model's string attributes
 * for a 'search' value provided via request query.
 */
const search = () => (req, res, next) => {
    let where = {};
    const search = req.query.search;
    if (!search) return next();
    const modelName = modelService.getModelName(req.params.model);
    if (!!search && !!db[modelName].getSearchAttributes) {
        if (!where[Op.or]) {
            where[Op.or] = [];
        }
        const searchAttributes = db[modelName].getSearchAttributes();
        searchAttributes.forEach(item => {
            where[Op.or].push({ [item]: { [Op.like]: `%${search}%` } });
        })
    }
    req.query.where = where;
    next();
}

module.exports = {
    check,
    order,
    search
}
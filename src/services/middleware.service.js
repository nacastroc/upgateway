const db = require('../models');

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

module.exports = {
    check
}
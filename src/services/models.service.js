const db = require('./../models')

/**
 * Return paginated data of a model.
 * @param {string} model
 * @param {*} query - query parameters.
 * @returns {*}
 */
async function list(model, query) {
    const modelName = model === 'gateways' ? 'Gateway' : 'Peripheral';
    const page = +query.page || 1;
    const limit = +query.limit || 10;
    const offset = (page - 1) * limit;
    const options = { offset, limit };
    return await db[modelName].findAndCountAll(options);
}

/**
 * Creates or updates an object.
 * @param {string} model
 * @param {*} data
 * @param {string|number} id 
 * @returns {*}
 */
async function save(model, data, id) {
    const options = model === 'Gateway' ? { serial: id } : { id };
    if (id) {
        const instance = await db[model].findOne({ where: options });
        if (instance) {
            return await instance.update(data)
        } else {
            throw new Error(`${model} not found`);
        }
    } else {
        return await db[model].create(data);
    }
}

/**
 * Destroys an object
 * @param {string} model 
 * @param {string|number} id 
 * @returns {*}
 */
async function destroy(model, id) {
    const where = model === 'Gateway' ? { serial: id } : { id };
    const instance = await db[model].findOne({ where });
    if (instance) {
        instance.destroy()
        return { message: `${model} deleted` }
    } else {
        throw new Error(`${model} not found`)
    }
}

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
            next(error)
        }
    }
}

module.exports = {
    list,
    save,
    destroy,
    check
}
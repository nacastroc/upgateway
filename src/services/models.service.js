const db = require('./../models')

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
        await instance.destroy();
        return instance;
    } else {
        throw new Error(`${model} not found`);
    }
}

/**
 * Finds a model instance by its id.
 * @param {string} model 
 * @param {string|number} id 
 * @returns 
 */
async function find(model, id) {
    return model === 'Peripheral' ? await db[model].findByPk(id) : await db[model].findOne({
        where: { serial: id },
        include: [{
            association: 'Peripherals',
            required: false
        }],
        order: [['Peripherals', 'date', 'DESC']]
    });
}

/**
 * Return paginated data of a model.
 * @param {string} model
 * @param {*} query - query parameters.
 * @returns {*}
 */
async function list(model, query) {
    const modelName = getModelName(model);
    const page = +query.page || 1;
    const limit = +query.limit || 10;
    const offset = (page - 1) * limit;
    const order = query.order;
    const where = query.where;
    const options = { where, offset, limit, order };
    const result = await db[modelName].findAndCountAll(options);
    result['page'] = page;
    result['limit'] = limit;
    result['pages'] = Math.ceil(result.count / limit);
    return result;
}

function getModelName(model) {
    return model === 'gateways' ? 'Gateway' : 'Peripheral';
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
            return await instance.update(data);
        } else {
            throw new Error(`${model} not found`);
        }
    } else {
        return await db[model].create(data);
    }
}

module.exports = {
    destroy,
    find,
    list,
    getModelName,
    save,
}
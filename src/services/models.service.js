const db = require('./../models')

function includes(model) {
    const association = model === 'Gateway' ? 'Peripherals' : 'Gateway'
    return [{ association, required: false }];
}

/**
 * Return paginated data of a model.
 * @param {String} model - model name.
 * @param {*} query - query parameters.
 * @returns {*}
 */
async function list(model, query) {
    const page = +query.page || 1;
    const limit = +query.limit || 10;
    const skip = (page - 1) * limit;
    const include = includes(model);
    return await db[model].findAndCountAll({ skip, limit, include }); ø
}

/**
 * Returns data of a model instance by its id.
 * @param {String} model - model name
 * @param {Integer} id 
 * @returns 
 */
async function view(model, id) {
    if (model === 'Gateway') {
        // Check id is in UUID format to avoid SQL possible injection.
        const uuidRe = /\b(uuid:){0,1}\s*([a-f0-9\\-]*){1}\s*/;
        if (!uuidRe.match(`${id}`)) {
            throw new Error('Invalid gateway serial.');
        }
        return await db[model].findOne({ where: { serial: id } });
    } else {
        return await db[model].findOne({ where: { id: +id } });
    }
}

module.exports = {
    list,
    view,
}
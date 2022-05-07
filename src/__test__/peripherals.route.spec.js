const request = require('supertest')
const app = require('../app')

describe('Peripherals API', () => {
    it('should return a paginated list of peripherals', async () => {
        const res = await request(app).get('/api/peripherals');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('count');
        expect(res.body).toHaveProperty('page');
        expect(res.body).toHaveProperty('pages');
        expect(res.body).toHaveProperty('limit');
        expect(res.body).toHaveProperty('rows');
        expect(res.body.rows).toHaveProperty('length');
        expect(res.body.rows[0]).toHaveProperty('id');
        expect(res.body.rows[0]).toHaveProperty('vendor');
        expect(res.body.rows[0]).toHaveProperty('date');
        expect(res.body.rows[0]).toHaveProperty('status');
        expect(res.body.rows[0]).toHaveProperty('createdAt');
        expect(res.body.rows[0]).toHaveProperty('updatedAt');
        expect(res.body.rows[0]).toHaveProperty('gateway');
    });

    it('list should be able to change page and limit', async () => {
        const res = await request(app).get('/api/peripherals?limit=2&page=2');
        expect(res.statusCode).toEqual(200);
        expect(res.body.rows.length).toEqual(2);
        expect(res.body.limit).toEqual(2);
        expect(res.body.page).toEqual(2);
    });

    it('should return a peripheral by its id', async () => {
        const res1 = await request(app).get('/api/peripherals?limit=1');
        const id = res1.body.rows[0].id;
        const res = await request(app).get(`/api/peripherals/${id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body.id).toEqual(id);
        expect(res.body).toHaveProperty('vendor');
        expect(res.body).toHaveProperty('date');
        expect(res.body).toHaveProperty('status');
        expect(res.body).toHaveProperty('createdAt');
        expect(res.body).toHaveProperty('updatedAt');
        expect(res.body).toHaveProperty('gateway');
    });

    it('should add a new peripheral', async () => {
        const res1 = await request(app)
            .post('/api/gateways')
            .send({
                name: 'Master 6',
                address: '192.168.1.6',
            });
        const res = await request(app)
            .post('/api/peripherals')
            .send({
                vendor: 'DELL',
                date: '2015-07-04',
                status: true,
                gateway: res1.body.serial,
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('vendor');
        expect(res.body.vendor).toEqual('DELL');
        expect(res.body).toHaveProperty('date');
        expect(res.body.date).toEqual('2015-07-04');
        expect(res.body).toHaveProperty('createdAt');
        expect(res.body).toHaveProperty('updatedAt');
        expect(res.body).toHaveProperty('gateway');
        expect(res.body.gateway).toEqual(res1.body.serial);
    });

    it('should update a peripheral', async () => {    
        const res1 = await request(app).get('/api/peripherals?limit=1');
        const id = res1.body.rows[0].id;    
        const res = await request(app)
            .put(`/api/peripherals/${id}`)
            .send({
                vendor: 'TESLA',                
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('vendor');
        expect(res.body.vendor).toEqual('TESLA');
    });

    it('should delete a peripheral', async () => {
        const res1 = await request(app).get('/api/peripherals?limit=1');
        const id = res1.body.rows[0].id;
        const res = await request(app)
            .del(`/api/peripherals/${id}`);
        expect(res.statusCode).toEqual(204);
    });
});
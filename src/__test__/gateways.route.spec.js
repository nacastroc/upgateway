const request = require('supertest')
const app = require('../app')

describe('Gateways API', () => {
    it('should return a paginated list of gateways', async () => {
        const res = await request(app).get('/api/gateways');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('count');
        expect(res.body.count).toBeGreaterThanOrEqual(4);
        expect(res.body).toHaveProperty('rows');
        expect(res.body.rows).toHaveProperty('length');
        expect(res.body.rows.length).toBeLessThanOrEqual(10);
        expect(res.body.rows[0]).toHaveProperty('serial');
        expect(res.body.rows[0]).toHaveProperty('name');
        expect(res.body.rows[0]).toHaveProperty('address');
        expect(res.body.rows[0]).toHaveProperty('createdAt');
        expect(res.body.rows[0]).toHaveProperty('updatedAt');
    });

    it('list should have only 2 rows on limit=2', async () => {
        const res = await request(app).get('/api/gateways?limit=2');
        expect(res.body.rows.length).toEqual(2);
    });

    it('list should be on page 2 at ?limit=2&page=2', async () => {
        const res = await request(app).get('/api/gateways?limit=2&page=2');
        expect(res.body.rows[0].name).toEqual('Master 3');
    });

    it('should return a gateway by its serial', async () => {
        const res1 = await request(app).get('/api/gateways?limit=1');
        const serial = res1.body.rows[0].serial;
        const res = await request(app).get(`/api/gateways/${serial}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.serial).toEqual(serial);
        expect(res.body).toHaveProperty('serial');
        expect(res.body).toHaveProperty('name');
        expect(res.body).toHaveProperty('address');
        expect(res.body).toHaveProperty('createdAt');
        expect(res.body).toHaveProperty('updatedAt');
    });

    it('should add a new gateway', async () => {
        const res = await request(app)
            .post('/api/gateways')
            .send({
                name: 'Master 5',
                address: '192.168.1.5',
            });
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('serial');
        expect(res.body).toHaveProperty('name');
        expect(res.body.name).toEqual('Master 5');
        expect(res.body).toHaveProperty('address');
        expect(res.body.address).toEqual('192.168.1.5');
        expect(res.body).toHaveProperty('createdAt');
        expect(res.body).toHaveProperty('updatedAt');
    });

    it('should update a gateway', async () => {
        const res1 = await request(app).get('/api/gateways?limit=1');
        const serial = res1.body.rows[0].serial;
        const res = await request(app)
            .put(`/api/gateways/${serial}`)
            .send({
                name: 'Master 1 Updated',
                address: '192.168.1.0',
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('serial');
        expect(res.body).toHaveProperty('name');
        expect(res.body.name).toEqual('Master 1 Updated');
        expect(res.body).toHaveProperty('address');
        expect(res.body.address).toEqual('192.168.1.0');
        expect(res.body).toHaveProperty('createdAt');
        expect(res.body).toHaveProperty('updatedAt');
    });

    it('should delete a gateway', async () => {
        const res1 = await request(app).get('/api/gateways?limit=1');
        const serial = res1.body.rows[0].serial;
        const res = await request(app)
            .del(`/api/gateways/${serial}`);
        expect(res.statusCode).toEqual(204);
    });
});
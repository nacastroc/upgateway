# upgateway

Managing gateways - master devices that control multiple peripheral devices.

## Usage

* Run `npm install` to installl dependencies.
* Run `npm run start` to start the local server.
* Load `http://localhost:3000` to test the endpoint.

## API Endpoints

### GET /api/gateways

Get a list of gateways.

```json
{
  "count": 5,
  "rows": [
    {
      "serial": "82c9e21f-0ed7-4924-a378-d81881b93a99",
      "name": "Master 1",
      "address": "192.168.1.1",
      "createdAt": "2022-05-06T00:30:53.169Z",
      "updatedAt": "2022-05-06T00:30:53.169Z"
    },
    {
      "serial": "47c7a56c-34c2-4cc4-8e3f-29010e7eba0d",
      "name": "Master 2",
      "address": "192.168.1.2",
      "createdAt": "2022-05-06T00:30:53.169Z",
      "updatedAt": "2022-05-06T00:30:53.169Z"
    },
  ]
}
```

### GET /api/gateways/{serial}

Get gateway information by gateway serial (including peripheral list, if any).

```json
{
  "serial":"82c9e21f-0ed7-4924-a378-d81881b93a99",
  "name":"Master 1",
  "address":"192.168.1.1",
  "createdAt":"2022-05-06T00:30:53.169Z",
  "updatedAt":"2022-05-06T00:30:53.169Z",
  "Peripherals":[
    {
      "id":1,
      "vendor":"Microsoft",
      "date":"2015-07-04 03:36:51.916 +00:00",
      "status":false,
      "createdAt":"2022-05-06T00:30:53.240Z",
      "updatedAt":"2022-05-06T00:30:53.240Z",
      "gateway":"82c9e21f-0ed7-4924-a378-d81881b93a99"
    },
    {
      "id":2,
      "vendor":"DELL",
      "date":"2007-10-11 20:18:35.847 +00:00",
      "status":true,
      "createdAt":"2022-05-06T00:30:53.240Z",
      "updatedAt":"2022-05-06T00:30:53.240Z",
      "gateway":"82c9e21f-0ed7-4924-a378-d81881b93a99"
    },
  ]
}
```

### POST /api/gateways/

To create a new gateway based on POST data (x-www-form-url-encoded in Postman).

![Postman example](/assets/post-gateway.png)

### PUT /api/gateways/{serial}

To update gateway data by serial, based on PUT data (x-www-form-url-encoded in Postman).

![Postman example](/assets/put-gateway.png)

### DELETE /api/gateways/{serial}

To remove a gateway from the database by gateway serial.

### GET /api/peripherals

Get a list of peripherals.

```json
{
  "count":22,
  "rows":[
    {
      "id":1,
      "vendor":"Microsoft",
      "date":"2015-07-04 03:36:51.916 +00:00",
      "status":false,
      "createdAt":"2022-05-06T00:30:53.240Z",
      "updatedAt":"2022-05-06T00:30:53.240Z",
      "gateway":"82c9e21f-0ed7-4924-a378-d81881b93a99"
    },
    {
      "id":2,
      "vendor":"DELL",
      "date":"2007-10-11 20:18:35.847 +00:00",
      "status":true,
      "createdAt":"2022-05-06T00:30:53.240Z",
      "updatedAt":"2022-05-06T00:30:53.240Z",
      "gateway":"82c9e21f-0ed7-4924-a378-d81881b93a99"
    }
  ]
}
```

### GET /api/peripherals/{id}

Get peripheral information by id.

```json
{
  "id":1,
  "vendor":"Microsoft",
  "date":"2015-07-04 03:36:51.916 +00:00",
  "status":false,
  "createdAt":"2022-05-06T00:30:53.240Z",
  "updatedAt":"2022-05-06T00:30:53.240Z",
  "gateway":"82c9e21f-0ed7-4924-a378-d81881b93a99"
}
```

### POST /api/peripherals/

To create a new peripheral based on POST data (x-www-form-url-encoded in Postman).

![Postman example](/assets/post-peripheral.png)

### PUT /api/peripherals/{id}

To update peripheral data by id, based on PUT data (x-www-form-url-encoded in Postman).

![Postman example](/assets/put-peripheral.png)

### DELETE /api/peripherals/{id}

To remove a peripheral from the database by gateway serial.

## License

Created by Nestor Castro and licensed under the GPLv3 license. Check the LICENSE file for more information.

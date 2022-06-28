const express = require('express');
const cors = require("cors");

dotenv.config();
const app = express();

const port = process.env.PORT || 8000;

const path = require('path');
// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSpec = {
    definition: {
        openapi:"3.0.0",
        info: {
            title:'Node Challenge Llatan',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local server'
            }
        ]
    },
    // apis: [ `${path.join(__dirname, './routes/*.js')}` ],
    apis: [`${path.dirname}`],
};

// middlewares
app.use(express.json());
app.use(cors());
app.use(
    '/api-doc',
    swaggerUi.serve,
    swaggerUi.setup(swaggerJsDoc(swaggerSpec))
);

const client_list = [];

//routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

//create client
/**
 * @swagger
 * components:
 *  schemas:
 *      Data:
 *          type: object
 *          properties: 
 *              first_name: 
 *                  type: string
 *                  description: El nombre
 *              last_name: 
 *                  type: string
 *                  description: Apellido
 *              age: 
 *                  type: integer
 *                  description: Edad
 *              birthday: 
 *                  type: string
 *                  description: Fecha de nacimiento
 *          required:
 *              - first_name
 *              - last_name
 *              - age
 *              - birthday
 *          example:
 *              first_name: Carlo
 *	            last_name: Munoz
 *	            age: 43
 *	            birthday: 1985-12-21
 */

/*
description: user to add to the system
content: 
  'application/json':
    schema:
      $ref: '#/components/schemas/User'
    examples:
      user:
        summary: User Example
        externalValue: 'http://foo.bar/examples/user-example.json'
*/

/**
 * @swagger
 * paths:
 *  /user:
        post:
        tags:
        - "user"
        summary: "Create user"
        description: "This can only be done by the logged in user."
        operationId: "createUser"
        produces:
        - "application/xml"
        - "application/json"
        parameters:
        - in: "body"
            name: "body"
            description: "Created user object"
            required: true
            schema:
            $ref: "#/definitions/User"
        responses:
            default:
            description: "successful operation"
 */


app.post('/creacliente', (req, res) => {
    const { first_name , last_name, age, birthday} = req.body;

    const data = {
        first_name : first_name,
        last_name : last_name,
        age : age,
        birthday : birthday
    };

    client_list.push(data);

    res.json({
        message: "client created succesfully",
        data:data
    });

});

app.get('/listclientes' , (req, res)=> {

    function addTime(date, time){
            date.setDate(date.getDate() + time);
        return date;
    };

    client_list.map( client => {
        let age = client.age;
        let birthday = client.birthday;

        birthday = new Date(birthday);

        //add x:years, y:months aprox
        const x = 30;
        const y = 4;

        // 13/12/1899
        client.dead_date = addTime(birthday, 365*x+ 30*y);
    });

    res.json({
        message: "client list",
        size: client_list.length,
        data: client_list
    })
});

app.get('kpideclientes', )



app.listen(port, () => {
    console.log('server running at port '+ port);
});
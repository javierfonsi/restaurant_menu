const express = require('express')
const router = express.Router()

const { 
    getEmployUserById,
    createEmployedUser,
} = require('../controllers/employUsers.controller');

//employed schema
/**
 * @swagger
 * components:
 *  schemas:
 *     Employed:
 *        type: object
 *        properties:
 *          name:
 *              type: string
 *              description: This field must be name employed.
 *              max-length: 50 chars
 *          lastName:
 *              type: string
 *              description: Fill with employee's lastname.
 *              max-length: 50 chars
 *          email:
 *              type: string
 *              description: According to email from employed.
 *              max-length: 60 chars
 *          password:
 *              type: string
 *              description: Fill with employee's password.
 *              max-length: 15 chars
 *          phone:
 *              type: integer
 *              description: employee's mobile.
 *              max-length: 15 chars
 *          role:
 *              type: string
 *              description: Fill with employee's role.
 *              max-length: 25 chars
 *        required:
 *          - name
 *          - lastName
 *          - email
 *          - password
 *          - phone
 *          - role
 *        example:
 *          name: George
 *          lastName: Washington
 *          email: george.w@gmail.com
 *          password: "1234A@654X"
 *          phone: 51 3153975286
 *          role: chef waiter courier
 */

//Get employedUser by Id
/**
 * @swagger
 * /api/v1/employed/{id}:
 *  get:
 *    summary: Returns a employedUser 
 *    tags: [Employed]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the employed user id
 *    responses:
 *      200:
 *        description: Return employedUser with id
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  items:
 *                    $ref: '#/components/schemas/Employed'
 *      404:
 *        description: The delivered id was not found.
 */

router.get('/:id', getEmployUserById)

//Post a new menu
/**
 * @swagger
 * /api/v1/employed:
 *  post:
 *    summary: create a new employed
 *    tags: [Employed]
 *    requestBody: 
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Employed'
 *    responses:
 *      201:
 *        description: new employed was created!
 *      400:
 *        description: some properties and/or their values are incorrect
 */
router.post('/', createEmployedUser)

module.exports = {employedUsersRouter : router}
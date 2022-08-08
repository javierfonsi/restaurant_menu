const express = require('express')
const router = express.Router()

const { 
    getEmployUserById 
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

//Post a new menu
/**
 * @swagger
 * /api/v1/employed:
 *  get:
 *    summary: Returns all employed list
 *    tags: [Employed]
 *    responses:
 *      200:
 *        description: All employed
 *        content:
 *          application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Employed'
 */

router.get('/', getEmployUserById)

module.exports = {employedUsersRouter : router}
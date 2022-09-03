const express = require('express');

const {
  getAllAdminUser,
  getAdminUserById,
  postAdminUser,
  patchAdminUserById,
  deleteAdminUserById,
  loginAdminUser
} = require('../controllers/adminusers.controller');

const {
  adminUserExists,
  protectAccountOwner
} = require('../middlewares/adminuser.middleware');

const { validateSession } = require('../middlewares/auth.middleware');

const router = express.Router();

//adminUsers schema
/**
 * @swagger
 * components:
 *  securitySchemes:
 *   bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 *  schemas:
 *     AdminUser:
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
 *              max-length: 50 chars
 *          password:
 *              type: string
 *              description: Fill with employee's password.
 *              max-length: 15 chars
 *        required:
 *          - name
 *          - lastName
 *          - email
 *          - password
 *        example:
 *          name: Albert
 *          lastName: Einstein
 *          email: albert.w@gmail.com
 *          password: "1234@"
 *          phone: 51 3125900370
 *     LoggedAdminUser:
 *        type: object
 *        properties:
 *          email:
 *              type: string
 *              description: According to email from employed.
 *              max-length: 50 chars
 *          password:
 *              type: string
 *              description: Fill with employee's password.
 *              max-length: 15 chars
 *        required:
 *          - email
 *          - password
 *        example:
 *          email: albert.w@gmail.com
 *          password: "1234@"
 */

//Post a new AdminUser
/**
 * @swagger
 * /api/v1/adminuser:
 *  post:
 *    summary: create a new adminUser
 *    tags: [AdminUser]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/AdminUser'
 *    responses:
 *      201:
 *        description: new adminUser was created!
 *      400:
 *        description: some properties and/or their values are incorrect
 */
router.post('/', postAdminUser);

//Login adminUser
/**
 * @swagger
 * /api/v1/adminuser/login:
 *  post:
 *    summary: allow auth an adminUser
 *    tags: [AdminUser]
 *    requestBody: 
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/LoggedAdminUser'
 *    responses:
 *      201:
 *        description: new adminUser was created!
 *      400:
 *        description: some properties and/or their values are incorrect
 */
router.post('/login', loginAdminUser);

router.use(validateSession);

// get all adminUser
/**
 * @swagger
 * /api/v1/adminuser:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: returns all adminUser which status are active
 *    tags: [AdminUser]
 *    responses:
 *      200:
 *        description: All adminUser
 *        content:
 *          application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/AdminUser'
 */

router.get('/', getAllAdminUser);

router.use('/:id', adminUserExists);
router
  .route('/:id')

//Get adminUser by Id
/**
 * @swagger
 * /api/v1/adminuser/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: returns an adminUser by id
 *    tags: [AdminUser]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the adminuser id
 *    responses:
 *      200:
 *        description: Return adminUser with id
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  items:
 *                    $ref: '#/components/schemas/AdminUser'
 *      404:
 *        description: The delivered adminUser id was not found.
 */

  .get(getAdminUserById)

// patch adminUser by Id
/**
 * @swagger
 * /api/v1/adminuser/{id}:
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    summary: Allows update some adminUser properties
 *    tags: [AdminUser]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the adminUser id
 *    requestBody:
 *      description: Update adminUser with selected properties
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                type: properties
 *                $ref: '#/components/schemas/AdminUser'
 *    responses:
 *      204:
 *        description: The selected adminUser id was modified partially
 *      404:
 *        description: The delivered adminUser id was not found.
 */

  .patch(protectAccountOwner, patchAdminUserById)

// delete adminUser by Id
/**
 * @swagger
 * /api/v1/adminuser/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: delete a adminUser using soft-delete
 *    tags: [AdminUser]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Type the adminUser id to delete
 *    responses:
 *      204:
 *        description: The selected adminUser id was deleted.
 *      404:
 *        description: The delivered adminUser id was not found.
 */
  .delete(protectAccountOwner, deleteAdminUserById);

module.exports = { adminUsersRouter: router };

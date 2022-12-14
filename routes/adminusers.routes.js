const express = require('express');

const {
  postAdminUser,
  loginAdminUser,
  getAllAdminUser,
  getAdminUserById,
  patchAdminUserById,
  deleteAdminUserById
} = require('../controllers/adminusers.controller');

const {
  adminUserExist,
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
 *     adminuser:
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
 *          phone:
 *              type: string
 *              description: Fill with employee's phone.
 *              max-length: 15 chars
 *        required:
 *          - name
 *          - lastName
 *          - email
 *          - password
 *          - phone
 *        example:
 *          name: Albert
 *          lastName: Einstein
 *          email: albert.w@gmail.com
 *          password: "1234@"
 *          phone: 51 3125900370
 *     loggedAdminUser:
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
 *     patchAdminUser:
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
 *          phone:
 *              type: string
 *              description: Fill with employee's phone.
 *              max-length: 15 chars
 *        example:
 *          name: Albert
 *          lastName: Einstein
 *          phone: 51 3125900370
 */

//Post a new AdminUser
/**
 * @swagger
 * /api/v1/adminuser:
 *  post:
 *    summary: create a new adminUser
 *    tags: [adminuser]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/adminuser'
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
 *    tags: [adminuser]
 *    requestBody: 
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/loggedAdminUser'
 *    responses:
 *      200:
 *        Description: return a valid token  
 *      201:
 *        description: new adminUser was created!
 *      400:
 *        description: some properties and/or their values are incorrect
 */
router.post('/login', loginAdminUser);


// get all adminUser
/**
 * @swagger
 * /api/v1/adminuser:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: returns all adminUser which status are active
 *    tags: [adminuser]
 *    responses:
 *      200:
 *        description: All adminUser
 *        content:
 *          application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/adminuser'
 *      401:
 *        description: Invalid session.
 */

router.use(validateSession);
router.get('/', getAllAdminUser);

router.use('/:id', adminUserExist);
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
 *    tags: [adminuser]
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
 *                    $ref: '#/components/schemas/adminuser'
 *      401:
 *        description: The token wasn't delivery, please add it. Or. Invalid session.
 *      404:
 *        description: The delivered adminUser id was not found.
 */

// router.get("/:id", getAdminUserById)
  .get(getAdminUserById)

// patch adminUser by Id
/**
 * @swagger
 * /api/v1/adminuser/{id}:
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    summary: Allows update some adminUser properties
 *    tags: [adminuser]
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
 *                $ref: '#/components/schemas/patchAdminUser'
 *    responses:
 *      201:
 *        description: The selected adminUser id was modified
 *      401:
 *        description: The token wasn't delivery, please add it. Or Invalid session.
 *      403:
 *        description: You can't update or delete other users accounts.
 *      404:
 *        description: The delivered adminUser id was not found.
 */

//router.patch("/:id", protectAccountOwner, patchAdminUserById)
  .patch(protectAccountOwner, patchAdminUserById)

// delete adminUser by Id
/**
 * @swagger
 * /api/v1/adminuser/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: delete a adminUser using soft-delete
 *    tags: [adminuser]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Type the adminUser id to delete
 *    responses:
 *      201:
 *        description: The selected adminUser id was deleted.
 *      401:
 *        description: The token wasn't delivery, please add it. Or. Invalid session.
 *      403:
 *        description: You can't update or delete other users accounts.
 *      404:
 *        description: The delivered adminUser id was not found.
 */
//  router.delete("/:id", protectAccountOwner, deleteAdminUserById);
  .delete(protectAccountOwner, deleteAdminUserById);

module.exports = { adminUsersRouter: router };

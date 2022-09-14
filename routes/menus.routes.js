const express = require('express')
const router = express.Router()

const { 
    createMenu,
    getAllMenus,
    getMenuById,
    putMenuById,
    patchMenuById,
    deleteMenuById,
    HardDeletebyId,
} = require('../controllers/menus.controller')

const { validateSession, userAdmin } = require('../middlewares/auth.middleware')

//util
const { upload } = require('../util/multer')

//menus schema
/**
 * @swagger
 * components:
 *  schemas:
 *     menu:
 *        type: object
 *        properties:
 *          name:
 *              type: string
 *              description: This field must be identifying the menu name.
 *              max-size: 50 chars
 *          description:
 *              type: string
 *              description: The menu detail.
 *              max-size: 200 chars
 *          price:
 *              type: string
 *              description: Price detail
 *              max-size: 10 chars
 *          img_Url:
 *              type: string
 *              format: base64
 *              description: Menu photo
 *              max-length: 200 chars
 *        required:
 *          - name
 *          - description
 *          - price
 *          - img_Url
 *        example:
 *          name: Mushroom soup
 *          description: Wild mushroom, sour cream scallion.
 *          price: 7,89 US
 *          img_Url: Ceviche de camaron.jpg
 */

//Post a new menu
/**
 * @swagger
 * /api/v1/menus:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: create a new menu
 *    tags: [menu]
 *    requestBody: 
 *      required: true
 *      content:
 *          multipart/form-data:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/menu'
 *    responses:
 *      201:
 *        description: new user was created!
 *      400:
 *        description: some properties and/or their values are incorrect
 *  
 */

//router.use(validateSession);
//router.post('/', userAdmin, upload.single('img_Url') , createMenu)
router.post('/',  upload.single('img_Url') , createMenu)

// get all menus
/**
 * @swagger
 * /api/v1/menus:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: returns all menus which status are active
 *    tags: [menu]
 *    responses:
 *      200:
 *        description: All menus
 *        content:
 *          application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/menu'
 */
router.get('/', getAllMenus)

// get menu by Id
/**
 * @swagger
 * /api/v1/menus/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: returns a selected id menu which status is active
 *    tags: [menu]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the menu id
 *    responses:
 *      200:
 *        description: A menu
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/menu'
 *      404:
 *        description: The delivered id was not found.
 */
router.get('/:id', getMenuById)


// patch menu by Id
/**
 * @swagger
 * /api/v1/menus/{id}:
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    summary: Allows update some menus properties
 *    tags: [menu]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the menu id
 *    requestBody: 
 *      description: Update menu with selected properties
 *      required: true
 *      content:
 *          multipart/form-data:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/menu'
 *    responses:
 *      204:
 *        description: The selected id was modified
 *      400:
 *        description: Some properties and/or their values are incorrect.
 *      404:
 *        description: The delivered id was not found.
 */
router.patch('/:id', upload.single('img_Url'), patchMenuById)


// delete menu by Id
/**
 * @swagger
 * /api/v1/menus/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: delete a menu using soft-delete
 *    tags: [menu]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Type the menu id to delete
 *    responses:
 *      204:
 *        description: The selected menu id was deleted.
 *      404:
 *        description: The delivered id was not found.
 */
router.delete('/:id', deleteMenuById)

// delete all menus
/**
 * @swagger
 * /api/v1/menus/harddelete/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: delete menu Id using hard-delete
 *    tags: [menu]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Type the menu id to delete
 *    requestBody: 
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    menus:
 *                      type: string
 *                required:
 *                    - menus
 *                example:
 *                      menus: HArdDEleteById
 *    responses:
 *      200:
 *        description: There was delete menu using hard-delete.
 *      400:
 *        description: The property and keyWord must be 'menus' and 'HArdDEleteById'.
 *      404:
 *        description: The delivered id was not found.
 */
router.delete('/harddelete/:id', HardDeletebyId)

module.exports = { menusRouter: router}
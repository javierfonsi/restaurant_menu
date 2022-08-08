const express = require('express')
const router = express.Router()

const { 
    getAllMenus,
    getMenuById,
    postMenu,
    putMenuById,
    patchMenuById,
    deleteMenuById,
    HardDeletebyId
} = require('../controllers/menus.controller')

//menus schema
/**
 * @swagger
 * components:
 *  schemas:
 *     Menu:
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
 *        required:
 *          - name
 *          - description
 *          - price
 *        example:
 *          name: Mushroom soup
 *          description: Wild mushroom, sour cream scallion.
 *          price: 7,89 US
 */

//Post a new menu
/**
 * @swagger
 * /api/v1/menus:
 *  post:
 *    summary: create a new menu
 *    tags: [Menu]
 *    requestBody: 
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Menu'
 *    responses:
 *      201:
 *        description: new user was created!
 * 
 */
router.post('/', postMenu)

// get all menus
/**
 * @swagger
 * /api/v1/menus:
 *  get:
 *    summary: returns all menus which status are active
 *    tags: [Menu]
 *    responses:
 *      200:
 *        description: All menus
 *        content:
 *          application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Menu'
 */
router.get('/', getAllMenus)

// get menu by Id
/**
 * @swagger
 * /api/v1/menus/{id}:
 *  get:
 *    summary: returns a selected id menu which status is active
 *    tags: [Menu]
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
 *              $ref: '#/components/schemas/Menu'
 *      404:
 *        description: The delivered id was not found.
 */
router.get('/:id', getMenuById)


// put menu by Id
/**
 * @swagger
 * /api/v1/menus/{id}:
 *  put:
 *    summary: Allows update all menus properties
 *    tags: [Menu]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the menu id
 *    requestBody: 
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Menu'
 *    responses:
 *      200:
 *        description: The selected menu was modified totaly
 *      400:
 *        description: Some properties and/or their values are incorrect.
 *      404:
 *        description: The delivered id was not found.
 */
router.put('/:id', putMenuById)

// patch menu by Id
/**
 * @swagger
 * /api/v1/menus/{id}:
 *  patch:
 *    summary: Allows update some menus properties
 *    tags: [Menu]
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
 *          application/json:
 *              schema:
 *                type: properties
 *                $ref: '#/components/schemas/Menu'
 *    responses:
 *      204:
 *        description: The selected id was modified partially
 *      400:
 *        description: Some properties and/or their values are incorrect.
 *      404:
 *        description: The delivered id was not found.
 */
router.patch('/:id', patchMenuById)


// delete menu by Id
/**
 * @swagger
 * /api/v1/menus/{id}:
 *  delete:
 *    summary: delete a menu using soft-delete
 *    tags: [Menu]
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
 *    summary: delete menu Id using hard-delete
 *    tags: [Menu]
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

module.exports = { menusRouter : router}
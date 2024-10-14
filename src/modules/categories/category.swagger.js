/**
 * @swagger
 * tags:
 *  name : Categories
 *  description : defining categories in this section
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      CreateCategory:
 *          type : object
 *          required:
 *              -   name
 *              -   icon
 *          properties:
 *              name : 
 *                  type : string
 *              slug:   
 *                  type : string
 *              icon : 
 *                  type : string
 *              parent  :
 *                  type  : string
 */

/**
 * @swagger
 * /category/create:
 *  post : 
 *      summary : creating a category
 *      tags:
 *          -   Categories
 *      requestBody : 
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref :  "#/components/schemas/CreateCategory"
 *      responses:  
 *          200:
 *              description : ok
 * /category/get :
 *  get:
 *      summary : get all categories that has been created.
 *      tags:
 *          -   Categories
 *      responses:
 *          200 :
 *              description : ok
 */
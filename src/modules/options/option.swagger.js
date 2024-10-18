/**
 * @swagger
 * tags:
 *  name: Options
 *  description : options for a category
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      CreateOption:
 *          type : object
 *          required :
 *              -   title
 *              -   key
 *              -   category
 *              -   type
 *          properties:
 *              title:
 *                  type : string
 *              key:
 *                  type : string
 *              type:
 *                  type : string
 *                  enum :
 *                      -   number
 *                      -   string
 *                      -   array
 *                      -   boolean
 *              selection:
 *                  type : array
 *              guide:
 *                  type : string
 *              category:
 *                  type : string
 */

/**
 * @swagger
 * /option/create:
 *  post:
 *      summary : creating an option for a category
 *      tags:
 *          -   Options
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:  
 *                  schema:
 *                      $ref : "#/components/schemas/CreateOption"
 *      responses:
 *          200:
 *              description: Ok
 */

/**
 * @swagger
 * /option/{id}:
 *  get:
 *      summary : getting option by its id
 *      tags :  
 *          -   Options
 *      parameters:
 *          -   in : path
 *              name : id
 *      responses :
 *          200:
 *              description : ok
 * /option/by-category/{id}:
 *  get:
 *      summary : getting option by its category id
 *      tags:
 *          -   Options
 *      parameters:
 *          -   in : path
 *              name : id
 *      responses :
 *          200:
 *              description : ok
 * /option/get:
 *  get:
 *      summary : get all options
 *      tags:
 *          -   Options
 *      responses:
 *          200:
 *            description : ok
 *          
 */
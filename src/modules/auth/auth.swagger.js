/**
 * @swagger
 * tags:
 *      name : Auth
 *      description : authenticate
 */

/**

/**
 * @swagger
 * components :
 *   schemas:
 *    SendOTP: 
 *          type : object
 *          properties:
 *              number:
 *                  type : string
 *          required:
 *              -   number
 *    CheckOTP:
 *      type : object
 *      required:
 *          -   code
 *          -   number
 *      properties:
 *          number :
 *              type : string
 *          code :
 *              type : string
 */


/**
 * @swagger
 * /auth/send-otp:
 *  post:
 *    summary : sending OTP to Client
 *    tags : 
 *          -   Auth
 *    requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema : 
 *                      $ref : "#/components/schemas/SendOTP"
 *    responses :
 *      200 :
 *          description : ok
 * 
 * /auth/check-otp:
 *  post:
 *      summary : check otp that has been sent to client
 *      tags:
 *          -   Auth
 *      requestBody:    
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref : "#/components/schemas/CheckOTP"
 *      responses:
 *          200:
 *              description : ok
 */
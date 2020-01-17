const express = require('express');
const productsService = require('../products/products.service');
const router = express.Router();

/**
 * Get all products
 * @param req
 * @param res
 * @param next
 * @returns {}
 */

function getAllProducts(req, res, next) {
    productsService.getAllProducts(req.query)
      .then(products => (products ? res.send( products ) : res.sendStatus(204)))
      .catch(err => next(err));
  };


module.exports = router;

/**
 * GET /api/v1/products
 * Get list of products
 */

router.get('/getProducts', getAllProducts);

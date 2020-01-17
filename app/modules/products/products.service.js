const product_hunt = require('../core/services/producthunt.service');
const Product = require('../products/products.model');

/*
 * Get all products by params
 * @param {String} date
 * @returns {Promise<Object>}
 */

module.exports.getAllProducts = async ({ day  }) => product_hunt.getProducts(day)
.then((products) => {
    const productsObject = JSON.parse(products.body);
    const productsToReturn = new Array();
    productsObject.posts.forEach((post) => {
        const product = Object.assign({
          id: post.id,
          name: post.name,
          tagline: post.tagline,
          day: post.day,
          created_at: post.created_at,
          votes_count: post.votes_count,
          thumbnail: post.thumbnail.image_url,
          topics: post.topics
        });
        productsToReturn.push(product);
      });
    return productsToReturn;
})

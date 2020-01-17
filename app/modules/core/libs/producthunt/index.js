const ProductHuntHttpClient = require('./httpClient');
const ACCESS_TOKEN = process.env.API_PH_TOKEN;
const HOST_URL = process.env.API_PH_HOST_URL || 'api.producthunt.com';

class ProductHuntClient {

    /**
   * @constructor
   * @param {Object} config
   *
   * Example: {
   *   auth: {
   *     username: '',
   *     password: '',
   *   },
   *   defaultParams: {
   *     someParam: 'value'
   *   }
   * }
   */
  constructor(config = {}) {
    this.httpClient = new ProductHuntHttpClient();

    this.defaultParams = {};

    if (config.defaultParams) {
      this.defaultParams = Object.assign({}, this.defaultParams, config.defaultParams);
    }
  }

   /**
   * Get Product Hunt products
   *
   * @param {String} day
   * @returns {Promise<Object>}
   */
  async getProducts(day) {
    const headers = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Accept': 'application/json',
      'content-type': 'application/json',
      'host': HOST_URL,
    };

    const data = {
        day
    };
    return this.doGetRequest(`/posts`, data, headers, {});
  }


  /**
   * Combine request parameters
   *
   * @private
   * @param data
   * @returns {Object}
   */
  prepareParams(data) {
    return Object.assign({}, this.defaultParams, data);
  }

  /**
   * Make GET request to Product Hunt API
   *
   * @private
   * @param {String} path
   * @param {Object} data
   *
   * @returns {Promise<T>}
   */
  async doGetRequest(path, data, headers) {
    return this.httpClient.get(
      path,
      this.prepareParams(data),
      headers,
    ).then();
  }
}

module.exports = ProductHuntClient;


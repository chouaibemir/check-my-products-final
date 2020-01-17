const request = require('request');
const BASE_URL = process.env.API_PH_BASE_URL || 'https://api.producthunt.com/v1';

class HttpClient {
    /**
     * @constructor
     * @param {Object} authData
     */
  
    constructor() {
        this.request = request.defaults({
            baseUrl: BASE_URL,
            timeout: 20 * 1000, // 10 sec
            rejectUnauthorized: false, // not verified certificate
        });
    }
  
  /**
   * Make GET request to Product Hunt API
   *
   * @param {String} path
   * @param {Object} data
   * @param {Object} headers
   *
   *
   * @returns {Promise<any>}
   */
  get(path, data = {}, headers = {}) {
    return new Promise((resolve, reject) => {
      this.request.get({
        headers,
        url: path,
        qs: data,
      }, (err, httpResponse, body) => {
        if (err || (httpResponse.statusCode < 200 || httpResponse.statusCode > 299)) {
          return reject(new Error(err));
        }

        return resolve({ body });
      });
    });
  }
}
  
  module.exports = HttpClient;
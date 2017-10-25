const querystring = require('querystring');

module.exports = require('@stamp/arg-over-prop')
.argOverProp({ // assigns passed `baseUrl` and `key` to `this` object
  baseUrl: 'https://trustspot.io/api/pub/',
  key: '',
  fetch: require('node-fetch')
})
.compose({
  methods: {
    _request({urlSuffix, params}) {
      if (!this.key || typeof this.key !== 'string') throw new Error('"key" option is mandatory');
      let body = Object.assign({key: this.key}, params);
      Object.keys(body).forEach(key => {
        if (!body[key]) delete body[key];
      });

      return this.fetch(this.baseUrl + urlSuffix, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        body: querystring.encode(body)
      })
      .then(response => response.json());
    },

    /**
     * Fetch company reviews
     * @param [limit] {Number} Max number of reviews to return
     * @param [offset] {Number} Offset of the reviews list
     * @param [sort] {('date desc'|'rating desc'|'rating asc')}
     */
    getCompanyReviews({limit, offset, sort} = {}) {
      return this._request({urlSuffix: 'get_company_reviews', params: {limit, offset, sort}});
    }
  }
});

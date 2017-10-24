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
      let body = ['key=' + this.key];
      if (params) Object.keys(params).filter(k => params[k]).forEach(k => body.push(`${k}=${params[k]}`));

      return this.fetch(this.baseUrl + urlSuffix, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        body: body.join('&')
      })
      .then(response => response.json());
    },

    /**
     * Fetch company reviews
     * @param [limit] {Number} Max number of reviews to return
     * @param [offset] {Number} Offset of the reviews list
     */
    getCompanyReviews({limit, offset} = {}) {
      return this._request({urlSuffix: 'get_company_reviews', params: {limit, offset}});
    }
  }
});

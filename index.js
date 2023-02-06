module.exports = require("stampit")({
    props: {
        // assigns passed `baseUrl` and `key` to `this` object
        baseUrl: "https://trustspot.io/api/pub/",
        key: "",
        fetch: global.fetch,
    },

    init({ baseUrl, key, fetch }) {
        if (baseUrl) this.baseUrl = baseUrl;
        if (key) this.key = key;
        if (fetch) this.fetch = fetch;
    },

    methods: {
        async _request({ urlSuffix, params }) {
            if (!this.key || typeof this.key !== "string") throw new Error('"key" option is mandatory');

            const body = Object.fromEntries(Object.entries(params).filter(([k, v]) => Boolean(v)));
            body.key = this.key;

            const response = await this.fetch(this.baseUrl + urlSuffix, {
                method: "POST",
                headers: {
                    Accept: "application/json, application/xml, text/plain, text/html, *.*",
                    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                },
                body: new URLSearchParams(body).toString(),
            });
            return await response.json();
        },

        /**
         * Fetch company reviews
         * @param [limit] {Number} Max number of reviews to return
         * @param [offset] {Number} Offset of the reviews list
         * @param [sort] {('date desc'|'rating desc'|'rating asc')}
         */
        async getCompanyReviews({ limit, offset, sort } = {}) {
            return await this._request({ urlSuffix: "get_company_reviews", params: { limit, offset, sort } });
        },
    },
});

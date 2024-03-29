# trustspot

Node.js library for trustspot.io API

Works in Node.js 8 and above.

## Install

```bash
npm i trustspot
```

## Find your API key

Go to your [Account Settings](https://trustspot.io/account_settings/general) and find the key there.

## Create API client instance

```js
import Trustspot from "trustspot";
// or
const Trustspot = require("trustspot");
```

In Node.js 18 and above:

```js
const trustspot = Trustspot({ key: MY_KEY });
```

In Node.js 16 and below:

```js
const trustspot = Trustspot({ key: MY_KEY, fetch: require("node-fetch") });
```

## Fetch data

### getCompanyReviews({limit=10, offset=0, sort='date desc'})

- `limit` - number
- `offset` - number
- `sort` - string, one of: `'date desc'`, `'rating desc'`, `'rating asc'`

```js
const reviews = await trustspot.getCompanyReviews({ offset: 12 });
console.log(reviews);
```

Will print something like this:

```js
{
  error: '',
  company_name: 'Acme Inc',
  review_count: '49',
  average_rating: 4.8,
  limit: 10,
  offset: 12,
  sort: 'date desc',
  company_reviews: [{
    reviewID: '959582',
    fullname: 'Alex Alex',
    rating: '5',
    recommend: '10',
    comments: 'Quick and easy. Great and responsive customer service. They answered any questions I had in a timely manner.',
    date: '2017-10-24',
    response: null,
    response_date: null
  }, {
...SNIP ...
  }, {
    reviewID: '957945',
    fullname: 'Angus Jalex',
    rating: '5',
    recommend: '10',
    comments: 'I\'ve used a lot. Everything just works like you designed it just for yourself.',
    date: '2017-10-10',
    response: 'Thanks Angus for your feedback. We&#039;re appreciating your comments and hope to see you again soon.',
    response_date: '2017-10-10'
  }]
}
```

## Changing the baseUrl

If your API is running not on the default domain here is how to use this module against a different URL.

```js
const Trustspot = require("trustspot").props({
  baseUrl: "localhost:8081",
});

const trustspot = Trustspot({ key: MY_KEY });
```

## Hardcode the key

If you don't want to pass the API key every time you can set the default API key for all object instances.

```js
const Trustspot = require("trustspot").props({ key: MY_KEY });

const trustspot = Trustspot(); // No need to pass the key any more!
```

# Contributing

This is an Open Open Source. Whoever submits a meaningful PR gets the write access.

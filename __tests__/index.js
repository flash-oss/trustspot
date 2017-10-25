const Trustspot = require('..');

describe('#getCompanyReviews', () => {
  it('throws if key is missing', () => {
    expect(() => Trustspot().getCompanyReviews()).toThrow();
  });

  it('change default key', () => {
    const MockedTrustspot = Trustspot
    .compose({
      properties: {
        key: '1234',
        fetch: () => Promise.resolve({json: () => ({})})
      }
    });

    expect(() => MockedTrustspot().getCompanyReviews()).not.toThrow();
  });

  it('fetch data', () => {
    const returnedJson = {
      error: '',
      company_name: 'Acme Inc',
      review_count: '49',
      average_rating: 4.8,
      limit: 10,
      offset: 0,
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
        reviewID: '959249',
        fullname: 'Timothy Balex',
        rating: '5',
        recommend: '10',
        comments: 'Easy quick and simple ',
        date: '2017-10-20',
        response: null,
        response_date: null
      }, {
        reviewID: '959259',
        fullname: 'Graeme Calex',
        rating: '5',
        recommend: '10',
        comments: 'Stunning UI that doesnt overlook function.',
        date: '2017-10-20',
        response: null,
        response_date: null
      }, {
        reviewID: '959081',
        fullname: 'Peter Dalex',
        rating: '5',
        recommend: '10',
        comments: 'Great help.',
        date: '2017-10-19',
        response: null,
        response_date: null
      }, {
        reviewID: '959056',
        fullname: 'Kirrily Ealex',
        rating: '3',
        recommend: '6',
        comments: 'Was very helpful and patient with me and gave me a link to follow next time.',
        date: '2017-10-18',
        response: 'Thank you Kirrily',
        response_date: '2017-10-18'
      }, {
        reviewID: '959059',
        fullname: 'Mitchell Falex',
        rating: '5',
        recommend: '10',
        comments: 'Very fast and efficient',
        date: '2017-10-18',
        response: 'Thank you Mitchell for your review',
        response_date: '2017-10-18'
      }, {
        reviewID: '959071',
        fullname: 'Urs Galex',
        rating: '5',
        recommend: '10',
        comments: 'Excellent and very prompt service. Many thanks!',
        date: '2017-10-18',
        response: 'Thank you Urs for the review. ????',
        response_date: '2017-10-18'
      }, {
        reviewID: '958218',
        fullname: 'Rudolf Halex',
        rating: '5',
        recommend: '10',
        comments: 'Support was the difference between signing up and using the service\r\n',
        date: '2017-10-13',
        response: null,
        response_date: null
      }, {
        reviewID: '958101',
        fullname: 'Jonathan Ialex',
        rating: '5',
        recommend: '10',
        comments: 'They are also quite reactive on the help chat.',
        date: '2017-10-11',
        response: 'Thanks Jonathan, we are happy you are pleased with the service and hope to see you again soon. ',
        response_date: '2017-10-11'
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
    };

    const MockedTrustspot = Trustspot
    .compose({
      properties: {
        fetch(url, {method, headers, body}) {
          expect(url).toBe('https://trustspot.io/api/pub/get_company_reviews');
          expect(method).toBe('POST');
          expect(headers).toEqual({
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
          });
          expect(body).toBe('key=1234&limit=11&offset=12');

          return Promise.resolve({json: () => returnedJson})
        }
      }
    });

    return MockedTrustspot({key: '1234'})
    .getCompanyReviews({limit: 11, offset: 12})
    .then(reviews => {
      expect(reviews).toBe(returnedJson);
    });
  });
});

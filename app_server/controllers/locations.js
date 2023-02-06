const request = require('request');
const apiOptions = {
  server: 'http://localhost:3000'
 };


 const showError = (req, res, status) => {
  let title = '';
  let content = '';
  if (status === 404) {
  title = '404, page not found';
  content = 'Oh dear. Looks like you can\'t find this page. Sorry.';
  } else {
  title = `${status}, something's gone wrong`;
  content = 'Something, somewhere, has gone just a little bit wrong.';
  }
  res.status(status);
  res.render('generic-text', {
    title,
    content
    });
   };


/* GET 'home' page */
const renderHomepage = function(req, res, responseBody) {
  let message = null;
  if (!(responseBody instanceof Array)){
    message = "Api Lookup Error"
    responseBody=[];
  }
  else{
    if (!responseBody.length){
      message = "No Places Found"
    }
  }
  res.render('locations-list', {
  title: 'Loc8r - find a place to work with wifi',
  pageHeader: {
    title: 'Loc8r',
    strapline: 'Find places to work with wifi near you!'
    },
    locations: responseBody,
    message
  });
 };

 const homelist = (req, res) => {
  const path = '/api/locations';
  const requestOptions = {
  url: `${apiOptions.server}${path}`,
  method: 'GET',
  json: {}
  };
  request(
  requestOptions,
  (err, {statusCode}, body) => {
    let data = [];
    if (statusCode === 200 && body.length) {
      data = body.map( (item) => {
      return item;
      });
      }
     renderHomepage(req, res,data);
  }
  );
 };



const renderDetailPage = (req, res , location) => {
  res.render('location-info', {
    title: location.name,
    pageHeader: {
      title: location.name
      },
      location
     }) ;
    };


   /* GET 'Add review' page */

   const getLocationInfo = (req, res, callback) => {
    const path = `/api/locations/${req.params.locationid}`;
    const requestOptions = {
    url : `${apiOptions.server}${path}`,
    method : 'GET',
    json : {}
    };
    request(
    requestOptions,
    (err, {statusCode}, body) => {
    let data = body;
    if (statusCode === 200) {
    callback(req, res, data);
 } else {
 showError(req, res, statusCode);
 }
 }
 );
};
const locationInfo = (req, res) => {
 getLocationInfo(req, res, 
 (req, res, responseData) => renderDetailPage(req, res, responseData)
 );
};


const renderReviewForm = (req, res,{name}) => {
  res.render('location-review-form', {
  title: `Review ${name} on Loc8r`,
  pageHeader: { title: `Review ${name}` },
  error: req.query.err
  });
 };

 const addReview = (req, res) => {
  getLocationInfo(req, res, 
  (req, res, responseData) => renderReviewForm(req, res, responseData)
  );
 };

 const doAddReview = (req, res) => {
  const locationid = req.params.locationid;
  const path = `/api/locations/${locationid}/reviews`;
  const postdata = {
  author: req.body.name,
  rating: parseInt(req.body.rating, 10),
  reviewText: req.body.review
  };
  const requestOptions = {
  url: apiOptions.server + path,
  method: 'POST',
  json: postdata
  };
  if (!postdata.author || !postdata.rating || !postdata.reviewText) {
  res.redirect(`/location/${locationid}/review/new?err=val`);
  } else {
  request(
  requestOptions,
  (err, {statusCode},{name}) => {
  if (statusCode === 201) {
  res.redirect(`/location/${locationid}`);
  } else if (statusCode === 400 && name && name === 'ValidationError' ) {
  res.redirect(`/location/${locationid}/review/new?err=val`);
  } else {
  showError(req, res, statusCode);
  }
  }
  );
  }
 };

   module.exports = {
    homelist,
    locationInfo,
    addReview,
    doAddReview
   };
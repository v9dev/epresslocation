const express = require('express');
const router = express.Router();
const ctrlLocations = require('../controllers/locations');
const ctrlAbout = require('../controllers/about');
/* Locations pages */
router.get('/', ctrlLocations.homelist);
router.get('/location/:locationid', ctrlLocations.locationInfo);
router
 .route('/location/:locationid/review/new')
 .get(ctrlLocations.addReview)
 .post(ctrlLocations.doAddReview);
/* Other pages */
router.get('/about', ctrlAbout.about);
module.exports = router;
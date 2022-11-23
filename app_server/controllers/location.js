/* GET 'home' page */
const homelist = (req, res) => {
    res.render('location-list', { 
        title: 'Express Location -find a place to work with wifi' ,
        pageHeader : {
            title: 'Loc8r',
            strapline: 'Find places to work with wifi near you!'
        },
        locations: [{
            name: 'Starcups',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 3,
            facilities: ['wifi', 'restaurant', 'local_bar'],
            distance: '100m',
            img:'https://source.unsplash.com/ItaV89TNkks'
            },{
            name: 'Cafe Hero',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 4,
            facilities: ['wifi', 'restaurant', 'local_bar'],
            distance: '200m',
            img:'https://source.unsplash.com/ydju9gb6fiI'
            },{
                name: 'Burger Queen',
                address: '125 High Street, Reading, RG6 1PS',
                rating: 2,
                facilities: ['wifi', 'restaurant', 'local_bar'],
                distance: '250m',
                img:'https://source.unsplash.com/CK6tjAIMJWM'
            }]
    });
   };
   /* GET 'Location info' page */
   const locationInfo = (req, res) => {
    res.render('location-info',
    {
    pageHeader: {
     title: 'Express Location ',
   },
   location: {
    name: 'Starcups',
    address: '125 High Street, Reading, RG6 1PS',
    rating: 3,
    facilities: ['wifi', 'restaurant', 'local_bar'],
    coords: {lat: 51.455041, lng: -0.9690884},
    openingTimes: [
      {
        days: 'Monday - Friday',
        opening: '7:00am',
        closing: '7:00pm',
        closed: false
      },
      {
        days: 'Saturday',
        opening: '8:00am',
        closing: '5:00pm',
        closed: false
      },
      {
        days: 'Sunday',
        closed: true
      }
    ],
    reviews: [
      {
        author: 'Simon Holmes',
        rating: 5,
        timestamp: '16 July 2013',
        reviewText: 'What a great place. I can\'t say enough good things about it.'
      },
      {
        author: 'Charlie Chaplin',
        rating: 3,
        timestamp: '16 June 2013',
        reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
      }
    ]
  }
    


    });
   };
   /* GET 'Add review' page */
   const addReview = (req, res) => {
    res.render('location-review-form', { title: 'Add review' });
   };

   module.exports = {
    homelist,
    locationInfo,
    addReview
   };
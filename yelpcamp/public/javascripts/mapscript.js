mapboxgl.accessToken = maptoken;


const token=maptoken

const geo = require('mapbox-geocoding');
 
  geo.setAccessToken(token);
 var oop;

  geo.geocode('mapbox.places', req.body.campground.location, async function (err, geoData) {
    oop=geoData.features[0].geometry.coordinates;
    console.log(oop);
   });
console.log(oop);
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: oop, // starting position [lng, lat]
    zoom: 9 // starting zoom
});



new mapboxgl.Marker()
    .setLngLat([-74.5,40])
    .addTo(map)

console.log(Campground);

mapboxgl.accessToken ='pk.eyJ1IjoicmlzaGFiaDI3MDkiLCJhIjoiY2t6Nm02Z3RpMGRhYzJvczhuZ25pMXQ3cSJ9.Y4gVAaqstu4ccFyK2vEeKQ';
const loc=Campground.Geometry.coordinates
const op=loc.split(',')
const map = new mapboxgl.Map({

container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v11', // style URL
center: op, // starting position [lng, lat]
zoom: 9 // starting zoom
});

const marker=new mapboxgl.Marker()
    .setLngLat(campground.Geometry.coordinates)
    .addTo(map)
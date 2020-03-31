
var firebaseConfig = {
  apiKey: "AIzaSyDFMGKA1wyzYxS5VfNu2MPzzfJaS90MCw4",
  authDomain: "final-project-mm.firebaseapp.com",
  databaseURL: "https://final-project-mm.firebaseio.com",
  projectId: "final-project-mm",
  storageBucket: "final-project-mm.appspot.com",
  messagingSenderId: "135010229483",
  appId: "1:135010229483:web:99f329ec2f48d408d932ae"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

function initMap() {

var styles = [
  {
    stylers: [
      {hue: "#FFC0CB"},
      { saturation: -20}
    ]
  },{
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {lightness: 100},
      {visibility: "simplified"}
    ]
  },{
    featureType: "road",
    elementType: "labels",
    stylers: [
      {visibility: "off"}
    ]
  }
];

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -33.390582, lng: -70.546035},
    zoom: 15
  });

  var marker = new google.maps.Marker({
  position: {lat: -33.390582, lng: -70.546035},
    map: map,
    title: 'Clavel Cafeteria'
});
};



var reservationData = {};

$(".dayoff").on("click", function(){
  reservationData.day = $(this).text();
});

$(".reservation-form").on('submit', function(e){

  e.preventDefault();
  reservationData.name = $(".userName").val();
  $(".userName").val("");

  console.log('reservationData');

  var firebaseData = database.ref('reservations');

  firebaseData.push(reservationData);

  $(".make-reservation").html("<h2>Thank you! See you soon</h2>");
});

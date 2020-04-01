
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

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -33.390582, lng: -70.546035},
    zoom: 15,
    scrollwheel: false
  });

  var marker = new google.maps.Marker({
  position: {lat: -33.390582, lng: -70.546035},
    map: map,
    title: 'Clavel Cafeteria'
});

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

};

var reservationData = {

};



$(".dayoff").on("click", function(){
  reservationData.day = $(this).text();
  $("#dayoptions").addClass("dayselected");
});

$(".reservation-form").on('submit', function(e){

  var userInput = $(".userName").val();

 if($("#dayoptions").hasClass("dayselected") == true && userInput !== ""){
  e.preventDefault();


  reservationData.name = userInput;

  $(".userName").val("");

  console.log(reservationData);

  var firebaseDatabase = database.ref('reservations');

  firebaseDatabase.push(reservationData);

  $(".make-reservation").html("<h2>Thank you! See you soon</h2>");

  $('.table-reservation').html('<tr><th>Name</th><th>Date</th></tr><script id="entry-template" type="text/x-handlebars-template"><tr><td>{{clientName}}</td><td>{{clientDate}}</td></tr></script>');

  getReservation();}else{
      e.preventDefault();
    $("#error").text("Please enter your name and a time");}

});

function getReservation(){

  var ref = database.ref('reservations');

  ref.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();

      var source = $("#entry-template").html();
          var template = Handlebars.compile(source);

          var reservationInfo = {clientName: childData.name,
                      clientDate: childData.day}
          var newListItemHTML = template(reservationInfo);
          $(".table-reservation").append(newListItemHTML);
          var divTable = $(".table-reservation").val();

          });


  });


};

getReservation();

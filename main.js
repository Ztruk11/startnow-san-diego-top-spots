 function initMap() {
   var map;
   var bounds = new google.maps.LatLngBounds();
   var mapOptions = {
     mapTypeId: 'roadmap'
   };
 

 $(document).ready(function () {
   // write your code here

   // Display a map on the page
   map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
   map.setTilt(45);

   $.getJSON("data.json", function (results) {
     $.each(results, function (i, result) {
       $('<tr>').html(
         '<td>' + result.name + '</td><td>' + result.description + '</td>' + "<td><a href='https://www.google.com/maps?q=" + result.location + "'>View on Google Maps</a></td>").appendTo('#table-id');

       // Info Window Content
       var infoWindowContent = '<div class="info_content">' + '<h3>' + result.name + '</h3>' + '<p>' + result.description + '</p>' + '</div>';

       // Display multiple markers on a map
       var infoWindow = new google.maps.InfoWindow();

       // Loop through our array of markers & place each one on the map  
       var position = new google.maps.LatLng(result.location[0], result.location[1]);
       bounds.extend(position);

       var marker = new google.maps.Marker({
         position: position,
         map: map,
         title: result.name
       })

       //Allow each marker to have an info window    
       google.maps.event.addListener(marker, 'mouseover', (function (marker, i) {
         return function () {
           infoWindow.setContent(infoWindowContent);
           infoWindow.open(map, marker);
         }
       })(marker, i));

       // Automatically center the map fitting all markers on the screen
       map.fitBounds(bounds);

     })
   })

   // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
   var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
     this.setZoom(9);
     google.maps.event.removeListener(boundsListener);


   })
 });
 }



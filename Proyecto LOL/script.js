/* ----------------------------------
* Clock Code
* Simple Clock in JQuery
------------------------------------ */


function Clock(){

	//Date Variable
	var date = new Date();

	//Time from Date
	var hh = date.getHours();
	var mm = date.getMinutes();
	var ss = date.getSeconds();

  	//Adding Zero
  	if(hh<10){
  		hh = '0'+hh;
  	}  
  	if(mm<10){
  		mm = '0'+mm;
  	}  
  	if(ss<10){
  		ss = '0'+ss;
  	}

  	//Inserting Time in the DOM
  	$(".hh").text(hh);
  	$(".mm").text(mm);
  	$(".ss").text(ss);
  }

  function DateInDom(){

  	var date = new Date();

	//Get Day from Date
	var day = date.getDate();
	if(day<10){
		day = '0'+day;
	}

  	//Get month from Date
  	var month = date.getMonth()+1;
  	if(month<10){
  		month = '0'+day;
  	}

  	//Inserting date in the DOM
  	$(".day").text(day);
  	$(".month").text(month);
  	$(".year").text(date.getFullYear());
  }

  /* LOOP FOR THE CLOCK */
  $(document).ready(function(){

  }, setInterval(function(){Clock(); DateInDom(); }, 1000));

/* ----------------------------------
* Map Code
* Google Maps API Code
------------------------------------ */

//Variables for the Map
var map;
var infoWindow;
var service;
var coor = {lat: 18.486058, lng: -69.931212};

//Function to create the Map
function initMap(){

	//Initializing the Map
	map = new google.maps.Map(document.getElementById('map'), {
		center: coor,
		zoom: 12,
		styles: [{
			stylers: [{ visibility: 'simplified' }]
		}, {
			elementType: 'labels',
			stylers: [{ visibility: 'off' }]
		}]
	});

	//Initializing the InfoWindow
	infoWindow = new google.maps.InfoWindow();

	//Initializing the Service
	service = new google.maps.places.PlacesService(map);

  	//The idle event is a debounced event, so we can query & listen without
    //throwing too many requests at the server.
    map.addListener('idle', performSearch);
}

//Function to Search in the Map
function performSearch(){

	//The request for the Search
	var request = {
		bounds: map.getBounds(),
		types: ["gas_station"],
		keyword: 'Gas Station'
	};

	//Searching in the Map
	service.radarSearch(request, callback);
}

//Function to Get Results From Search
function callback(results, status) {

	//If not OK then RETURN
	if (status !== google.maps.places.PlacesServiceStatus.OK) {
		console.error(status);
		return;
	}
	//Loop for create markers
	for (var i = 0, result; result = results[i]; i++) {
		addMarker(result);
	}
}

//Function to add markers in the Map
function addMarker(place){

	//Show markers in the Map
	var marker = new google.maps.Marker({
		map: map,
		animation: google.maps.Animation.DROP,				
		icon: {
			url: 'http://mt.google.com/vt/icon/name=icons/spotlight/gas_station_L_8x.png&scale=1.7'
		},
		position: place.geometry.location
	});


	marker.addListener('click', toggleBounce);
	function toggleBounce() {
		if (marker.getAnimation() !== null) {
			marker.setAnimation(null);
		} else {
			marker.setAnimation(google.maps.Animation.BOUNCE);
		}
	}

	marker.addListener('mouseover', function() {
		service.getDetails(place, function(site, status) {
			marker.$.title = "updated title";
			map.removeOverlay(marker);
			map.addOverlay(marker);
		});
	});

	//Click Event for marks
	google.maps.event.addListener(marker, 'click', function() {
		service.getDetails(place, function(result, status) {

        	//If not OK then RETURN
        	if (status !== google.maps.places.PlacesServiceStatus.OK) {
        		console.error(status);
        		return;
        	}

            /*------------------------------------------------------------------------------
			* The Place variable is: result. Example to get the name of the place: ''result.name''.
			-------------------------------------------------------------------------------- */
			var empresas= ['Texaco','Eco','Esso','Propagas','Isla','Tropigas','Credigas','Petronan','Mariot','Aferme','Total'];		
			
			//SIDEBAR INFO
			$('#titulo_carta').text(result.name);
			$('#tel_carta').text(result.international_phone_number);
			$('#dir_carta').text(result.formatted_address);			
			if(result.opening_hours!=null){
				$('#hora_carta').text("Abierto de: "+result.opening_hours.periods[1].open.time+" AM A: "+result.opening_hours.periods[1].close.time+" PM");
			}
			var name =result.name;
			var name1=name.toLowerCase();

			//IMAGE SETTINGS
			if(/texaco/.test(name1)){
				$('#img_carta').attr('src','emp/texaco.png');
				$('#web_carta').text("http://www.texaco.com/");

			}if(/eco/.test(name1)){
				$('#img_carta').attr('src','emp/eco.png');
				$('#web_carta').text("http://www.ecopetroleo.do/");

			}if(/esso/.test(name1)){
				$('#img_carta').attr('src','emp/esso.png');
				$('#web_carta').text("https://www.esso.com/");

			}if(/total/.test(name1)){
				$('#img_carta').attr('src','emp/total.png');
				$('#web_carta').text("https://www.total.com.do/");

			}if(/aferme/.test(name1)){
				$('#img_carta').attr('src','emp/aferme.jpg');
				$('#web_carta').text("http://afermegas.com.do/");

			}if(/sigma/.test(name1)){
				$('#img_carta').attr('src','emp/sigma.png');
				$('#web_carta').text("http://www.gruposencion.com/empresa/sigma-petroleum-corporation/");

			}if(/petronan/.test(name1)){
				$('#img_carta').attr('src','emp/petronan.png');
				$('#web_carta').text("http://www.petronan.com/");
				/*codigo front end y back end ISFB y WETA*/

			}if(/tropigas/.test(name1)){
				$('#img_carta').attr('src','emp/tropigas.png');
				$('#web_carta').text("http://tropigas.com.do/");

			}if(/onegas/.test(name1)){
				$('#img_carta').attr('src','emp/onegas.png');
				$('#web_carta').text("http://www.onegas.com.do/");

			}if(/nativa/.test(name1)){
				$('#img_carta').attr('src','emp/nativa.png');
				$('#web_carta').text("http://www.credigasnativa.com/");

			}if(/shell/.test(name1)){
				$('#img_carta').attr('src','emp/shell.png');
				$('#web_carta').text("http://www.shell.com.do/");

			}if(/isla/.test(name1)){
				$('#img_carta').attr('src','emp/isla.png');
				$('#web_carta').text("http://1524.do.all.biz/");

			}if(/propagas/.test(name1)){
				$('#img_carta').attr('src','emp/propa.png');
				$('#web_carta').text("http://grupopropagas.com/");
			}

			//RATING SETTINGS
			if(result.rating!=null){	
				$(".rating .number").text(result.rating);			
				$("#rateYo").rateYo("option", "rating", result.rating);				
			}else{
				$(".rating .number").text(0);
				$("#rateYo").rateYo("option", "rating", 0);	
			}

            //Inserting place name in the infoWindow
            infoWindow.setContent(result.name);
            infoWindow.open(map, marker);
        });
	});
}
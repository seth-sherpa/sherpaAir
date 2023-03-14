
function setHeaderImageHeight() {
    document.querySelector(".header").style.height = (window.innerHeight*0.75) + "px";
}


function getTodaysDate() {
    var today = new Date().getFullYear()+'-'+("0"+(new Date().getMonth()+1)).slice(-2)+'-'+("0"+new Date().getDate()).slice(-2)
    var nextWeek = new Date();
    nextWeek.setDate(new Date().getDate() + 7);
    var returnDate = nextWeek.getFullYear()+'-'+("0"+(nextWeek.getMonth()+1)).slice(-2)+'-'+("0"+nextWeek.getDate()).slice(-2)
    document.getElementById("departDate").value = today;
    document.getElementById("returnDate").value = returnDate;
}
// Opens flight_search.html. 
// Takes Origin, Destination, Outbound & Return Dates from Flight Search Form. Sets Return Date to 'null' if it's a one way trip
function goToFlightSearchPage() {
  let fromLocation = document.getElementById('fromLocation');
  let origin = fromLocation.value;
  let toLocation = document.getElementById('toLocation');
  let destination = toLocation.value;
  let outboundDate = document.getElementById('departDate').value;
  let returnDate = document.getElementById('returnDate').value;
  
  //Assigns OriginName based on Origin & Passport Based on Origin Country
  switch (origin) {
   case "YYZ":
       passport = "CAN";
       originName = "Toronto";
       break;
   case "YVR":
      passport = "CAN";
      originName = "Vancouver";
      break;
  case "JFK":
      passport = "USA";
      originName = "New York";
      break;
  case "LHR":
      passport = "GBR";
      originName = "London";
      break;
  case "CDG":
      passport = "FRA";
      originName = "Paris";
      break;
}
// Assigns Destination Name Based on destination
switch (destination) {
   case "CAI":
      destinationName = "Cairo";
       break;
   case "IST":
       destinationName = "Istanbul";
       break;
  case "ICN":
      destinationName = "Seoul";
      break;
  case "BOM":
      destinationName = "Mumbai";
      break;
  case "DXB":
      destinationName = "Dubai";
      break;
}

// Checks if return date is disabled and flight search and sets it to null if it is. Otherwise returnDate is set to the date selected
  if (document.getElementById('returnDate').disabled == true) {
    returnDate = 'null';
  } else {
    let returnDate = document.getElementById('returnDate').value;
  }
  window.location.href = `flightsearch.html?origin=${origin}&destination=${destination}&outboundDate=${outboundDate}&returnDate=${returnDate}&originName=${originName}&destinationName=${destinationName}&passport=${passport}`;
}

//retrieves an itinerary from a list and redirects to mmb.html based on the retrieved itinerary
function getItinerary(itinerary){
    
    switch (itinerary) {
        case "AAA":
            window.location.href = `mmb.html?origin=LHR&destination=CAI&outboundDate=2023-03-10&returnDate=2023-03-17&originName=London&destinationName=Cairo&passport=GBR`;
            break;
        case "BBB": 
            window.location.href = `mmb.html?origin=CDG&destination=ICN&outboundDate=2023-03-10&returnDate=2023-03-17&originName=Paris&destinationName=Seoul&passport=FRA`;
            break;
        case "CCC":
            window.location.href = `mmb.html?origin=JFK&destination=IST&outboundDate=2023-03-10&returnDate=2023-03-17&originName=New%20York&destinationName=Istanbul&passport=USA`;
            break;
        case "DDD": 
            window.location.href = `mmb.html?origin=YVR&destination=DXB&outboundDate=2023-03-10&returnDate=2023-03-17&originName=Vancouver&destinationName=Dubai&passport=CAN`;
            break;
        default: 
            window.location.href = `mmb.html?origin=YYZ&destination=BOM&outboundDate=2023-03-10&returnDate=2023-03-17&originName=Toronto&destinationName=Mumbai&passport=CAN`;
        }
    }

//goes to mmb.html and passes existing query parameters
function goToMMB(){
    window.location.href = `mmb.html${window.location.search}`;
}

//goes to booking_confirmation.html and passes existing query parameters
function goToBookingConfirmation(){
    window.location.href = `booking_confirmation.html${window.location.search}`;
}

// returns the query string
function getQueryString() {

    const queryString = window.location.search;
    //create urlParams object, passing the queryString values
    const urlParams = new URLSearchParams(queryString);
    return urlParams;

}


//Return the ORIGIN from the URL Query Parameters
function getOriginCode() {
    
    const originCode = getQueryString().get('origin');
    return originCode;

}

//Return the DESTINATION from the URL Query Parameters
function getDestinationCode() {
    
    const destinationCode = getQueryString().get('destination');
    return destinationCode;

}

//Return the OUTBOUND date from the URL Query Parameters
function getOutboundDate(){
    const outboundDate = getQueryString().get('outboundDate');
    return outboundDate;
}

//Return the OUTBOUND date from the URL Query Parameters
function getReturnDate(){
    const returnDate = getQueryString().get('returnDate');
    return returnDate;
} 

//Return the ORIGIN name from the URL Query Parameters
function getOriginName(){
    const originName = getQueryString().get('originName');
    return originName;
}

//Return the DESTINATION name
function getDestinationName(){
    const destinationName = getQueryString().get('destinationName');
    return destinationName;
}

//Return the PASSPORT from the URL Query Parameters
function getPassport(){
    const passport = getQueryString().get('passport');
    return passport; 
}

// Creates and retrieves a segment array with: originCode, destinationCode, OriginName, DestinationName, Departure date, Arrival date

// function getSegments()
// {
    

//     let segments = [
        
//         //OUTBOUND segment
//         {
//           "originCode": getOriginCode(),
//           "originName": getOriginName(),
//           "destinationCode": getDestinationCode(),
//           "destinationName": getDestinationName(),
//           "departureDate": getOutboundDate(),
//           "arrivalDate":   getOutboundDate()
//         },
//         //RETURN segment (origin & departure are reversed)
        
//         {
//             "originCode": getDestinationCode(),
//             "originName": getDestinationName(),
//             "destinationCode": getOriginCode(),
//             "destinationName": getOriginName(),
//             "departureDate": getOutboundDate(),
//             "arrivalDate": getOutboundDate()
//         },]
//     return segments;
// }

//Populates the Booking Confirmation Page based on the URL Query Parameters
function populateBookingConfirmationPage() 
{
     // populate DEPARTURE Origin with Origin Name & Origin Code
     document.getElementById('departureOrigin').innerHTML = `${getOriginName()} <br> (${getOriginCode()})`;
     // populate Departure Destination with Destination Name & Destination Code
     document.getElementById('departureDestination').innerHTML = `${getDestinationName()} <br> (${getDestinationCode()})`;
     // populate RETURN Origin with Destination Name & Destination Code
     document.getElementById('returnOrigin').innerHTML = `${getDestinationName()} <br> (${getDestinationCode()})`;
     // populate RETURN Destintation with Origin Name & Origin Code
     document.getElementById('returnDestination').innerHTML = `${getOriginName()} <br> (${getOriginCode()})`;
    
     document.getElementById('outboundDepartureDate').insertAdjacentHTML("afterbegin", getOutboundDate());
     document.getElementById('outboundArrivalDate').insertAdjacentHTML("afterbegin", getOutboundDate());
     document.getElementById('returnDepartureDate').insertAdjacentHTML("afterbegin", getReturnDate());
     document.getElementById('returnArrivalDate').insertAdjacentHTML("afterbegin", getReturnDate());


     //if return date is null, hide the return segment, otherwise display it
     if (getReturnDate() == 'null') {
        document.getElementById("returnSegment").style.display = "none";
      } else {
        document.getElementById("returnSegment").style.display = "inline";
      }
}

//Populates the Flight Search Page based on the URL Query Parameters
function populateFlightSearchPage(){
     // populate page title with origin and destination
     document.getElementById('flightSearchTitle').innerHTML = `Flights from ${getOriginName()} (${getOriginCode()}) to ${getDestinationName()} (${getDestinationCode()})`;
     // populate Departure Origin with const origin
     document.getElementById('departureOrigin').innerHTML = `${getOriginName()} <br> (${getOriginCode()})`;
     // populate Departure Destination with const destination
     document.getElementById('departureDestination').innerHTML = `${getDestinationName()} <br> (${getDestinationCode()})`;
     // populate Return Origin with const destination
     document.getElementById('returnOrigin').innerHTML = `${getDestinationName()} <br> (${getDestinationCode()})`;
     // populate Return Destintation with const origin
     document.getElementById('returnDestination').innerHTML = `${getOriginName()} <br> (${getOriginCode()})`;
     document.getElementById('outboundDepartureDate').insertAdjacentHTML("afterbegin", getOutboundDate());
     document.getElementById('outboundArrivalDate').insertAdjacentHTML("afterbegin", getOutboundDate());
     document.getElementById('returnDepartureDate').insertAdjacentHTML("afterbegin", getReturnDate());
     document.getElementById('returnArrivalDate').insertAdjacentHTML("afterbegin", getReturnDate());

     // populate Departure Origin with const origin
     document.getElementById('departureOrigin2').innerHTML = `${getOriginName()} <br> (${getOriginCode()})`;
     // populate Departure Destination with const destination
     document.getElementById('departureDestination2').innerHTML = `${getDestinationName()} <br> (${getDestinationCode()})`;
     // populate Return Origin with const destination
     document.getElementById('returnOrigin2').innerHTML = `${getDestinationName()} <br> (${getDestinationCode()})`;
     // populate Return Destintation with const origin
     document.getElementById('returnDestination2').innerHTML = `${getOriginName()} <br> (${getOriginCode()})`;
     document.getElementById('outboundDepartureDate2').insertAdjacentHTML("afterbegin", getOutboundDate());
     document.getElementById('outboundArrivalDate2').insertAdjacentHTML("afterbegin", getOutboundDate());
     document.getElementById('returnDepartureDate2').insertAdjacentHTML("afterbegin", getReturnDate());
     document.getElementById('returnArrivalDate2').insertAdjacentHTML("afterbegin", getReturnDate());

     // populate Departure Origin with const origin
     document.getElementById('departureOrigin3').innerHTML = `${getOriginName()} <br> (${getOriginCode()})`;
     // populate Departure Destination with const destination
     document.getElementById('departureDestination3').innerHTML = `${getDestinationName()} <br> (${getDestinationCode()})`;
     // populate Return Origin with const destination
     document.getElementById('returnOrigin3').innerHTML = `${getDestinationName()} <br> (${getDestinationCode()})`;
     // populate Return Destintation with const origin
     document.getElementById('returnDestination3').innerHTML = `${getOriginName()} <br> (${getOriginCode()})`;
     document.getElementById('outboundDepartureDate3').insertAdjacentHTML("afterbegin", getOutboundDate());
     document.getElementById('outboundArrivalDate3').insertAdjacentHTML("afterbegin", getOutboundDate());
     document.getElementById('returnDepartureDate3').insertAdjacentHTML("afterbegin", getReturnDate());
     document.getElementById('returnArrivalDate3').insertAdjacentHTML("afterbegin", getReturnDate());
}
//Populates the MMB Page based on the URL Query Parameters
function populateMMB(){
    // populate Departure Origin with const origin
    document.getElementById('departureOrigin').innerHTML = `${getOriginName()} <br> (${getOriginCode()})`;
    // populate Departure Destination with const destination
    document.getElementById('departureDestination').innerHTML = `${getDestinationName()} <br> (${getDestinationCode()})`;
    // populate Return Origin with const destination
    document.getElementById('returnOrigin').innerHTML = `${getDestinationName()} <br> (${getDestinationCode()})`;
    // populate Return Destintation with const origin
    document.getElementById('returnDestination').innerHTML = `${getOriginName()} <br> (${getOriginCode()})`;
    document.getElementById('outboundDepartureDate').insertAdjacentHTML("beforeend", getOutboundDate());
    document.getElementById('returnDepartureDate').insertAdjacentHTML("beforeend", getReturnDate());

    //If return date is null, hide the return segment otherwise display it
    if (getReturnDate() == 'null') {
        document.getElementById("returnSegment").style.display = "none";
      } else {
        document.getElementById("returnSegment").style.display = "inline";
      }
					
				  

}
function buildElement() {

    const elementConfig = {
        // 1. Element Placement: Where the Element is being placed on your site e.g. mmb, discovery            
        placement: "discovery",
        travellers: [{
            nationality: getPassport(), //traveller's passport
            vaccinations: [{
                type: 'COVID_19',
                status: 'FULLY_VACCINATED',
            }, ],
        }, ],
        segments: [{
            segmentType: 'OUTBOUND',
            origin: {
                airportCode: getOriginCode(),
            },
            destination: {
                airportCode: getDestinationCode(),
            },
            travelMode: 'AIR',
            departureDate: getOutboundDate(),
            arrivalDate: getOutboundDate(),
        }, ],
    };

    return elementConfig;

}


function showForm(){
  var x = document.getElementById("location-form");
  x.style.display= "block";
};

(function() {
  const form    = document.getElementById('calc-form');
  const results = document.getElementById('results');
  const errors  = document.getElementById('form-error');

  /**
   * Display a form validation error
   *
   * @param   {String}  msg  The validation message
   * @return  {Boolen}       Returns false
   */
  function errorMessage(msg) {
      errors.innerHTML = msg;
      errors.style.display = '';
      return false;
  }
  

  /**
   * Display the calculation results
   *
   * @param   {Integer}  calories   The calories burned
   * @param   {Integer}  distance   The distance run
   * @param   {String}   unit       The distance unit (miles or kilometers)
   * @param   {Integer}  burnRate   The calories per distance burn rate
   * @param   {Integer}  calsPerHr  The calories burned per hour
   */
  function showResults(calories) {
      results.innerHTML = `<p>Your basal metabolic rate (BMR) is: <strong>${(calories).toFixed(2)} </strong> calories a day.</p><a href="#" id="rs">revise</a>`;
    results.style.display = ''
    form.style.display = 'none'
    errors.style.display = 'none'
    
    localStorage.setItem('calories', calories.toFixed(2));
  }
  

  /**
   * Hide the results and reset the form
   */
  function resetForm(e) {
    if(e.target.id = 'rs') {
      e.preventDefault();
      results.style.display = 'none';
      form.style.display = '';
      form.reset()
      
    }
    var x = document.getElementById("location-form");
    x.style.display= "none";
  }
  
  /**
   * Handle form submit
   */
  function submitHandler(e) {
      e.preventDefault();

      // Age
      let age = parseFloat(form.age.value);
      //let unit = form.distance_unit.value;
      if(isNaN(age) || age < 0) {
          return errorMessage('Please enter a valid age');
      }
 
      // Height
      let heightCM = parseFloat(form.height_cm.value);
      if(isNaN(heightCM) || heightCM < 0) {
          
        let heightFeet = parseFloat(form.height_ft.value);
        if(isNaN(heightFeet) || heightFeet < 0) {
            return errorMessage('Please enter a valid Height in feet or centimeters');
        }      
       let heightInches = parseFloat(form.height_in.value);
        if(isNaN(heightInches) || heightInches < 0) {
            heightInches=0;
        }   
        heightCM = (2.54 * heightInches) + (30.4 * heightFeet)
        
      }   

        let weight = parseFloat(form.weight.value);
        if(isNaN(weight) || weight < 0) {
            return errorMessage('Please enter a valid weight');
        }   
    
      if(form.weight_unit.value == 'lb') {
          weight = 0.453592 * weight;
      }
    
     let calories = 0;
     if(form.gender.value == 'Female') {
        //females =  655.09 + 9.56 x (Weight in kg) + 1.84 x (Height in cm) - 4.67 x age   
       calories = 655.09 + (9.56 * weight) + (1.84 * heightCM) - (4.67 * age);
      }  else {
       calories = 66.47 + (13.75 * weight) + (5 * heightCM) - (6.75 * age);
      }
      

      // Display results
     showResults(calories);
     
     showForm();
     
  }
  

  // Add Event Listeners
  
  form.addEventListener('submit', submitHandler);
  results.addEventListener('click', resetForm, true);

})();

var getId = document.querySelector("#getId");
var inputEl = document.querySelector("#zipCode");
const errors  = document.getElementById('form-error');
var ContainerEl = document.querySelector('#repos-container');
/**
   * Display a form validation error
   *
   * @param   {String}  msg  The validation message
   * @return  {Boolen}       Returns false
   */
 function errorMessage(msg) {
  errors.innerHTML = msg;
  errors.style.display = '';
  return true;
}

function render (){
  
   if (!inputEl.value || isNaN(inputEl.value || inputEl.value === null)) {
     return errorMessage('please enter a valid zipcode');
   };
  
  console.log(inputEl.value)
  // hit   zipcode api to get lat and lon
   fetch("https://api.zip-codes.com/ZipCodesAPI.svc/1.0/QuickGetZipCodeDetails/"+inputEl.value+"?key=PYUHG08HN6TMG8HGUI6Q").then(function(response){
       return response.json();
   }).then(function(data){
       console.log(data)
       var lat = data.Latitude;
       var lon = data.Longitude;
       var city = data.City;
       var state = data.State
       console.log(lat,lon)
       
       
       console.log(city +","+state)
       var url ="https://trackapi.nutritionix.com/v2/locations?ll=" + lat + "," + lon + "&distance=2mi";
 
       fetch(
           url,
           {
               headers: {
                   'x-app-id': '713936a2',
                   'x-app-key': '78f575a6b73c1e3d938c41c8b6ea3ae0'
               }
           }
       ).then(function(res){
           return res.json();   
       }).then(function(data){
         console.log(data);
         
         for (var i=0; i<data.locations.length; i++){
             var restaurant = data.locations[i].name;
             var location = data.locations[i].address;
             
             
           //    / create a container for each restaurant 
              var restEl = document.createElement('span');
              restEl.classList = 'restaurant list-item flex-row justify-space-between align-center';
              restEl.setAttribute("data-restaurant", restaurant);

              // create a span element to hold restaurant name
              var titleEl = document.createElement('span')
              var area = document.createElement('span');
              area.classList='subtitle';
              area.textContent = location;
              titleEl.textContent = restaurant;

              // append to container
              restEl.appendChild(titleEl);
              restEl.appendChild(area);

              ContainerEl.appendChild(restEl);
            // console.log(restaurant); 
         }
   
       //   // loop over results and show each item in a ul - brand_id as a data-brand-id attribute
   
      });  
  });
}

function getMenu(e) {
  var target = e.target;
  if (target.classList.contains('restaurant')) {
    var restaurant = target.dataset.restaurant;
    window.location.href = './menu.html?restaurant=' + restaurant;
  }
};

ContainerEl.addEventListener('click', getMenu);
getId.addEventListener('click', render);
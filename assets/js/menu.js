
var coloriesLeft = localStorage.getItem('calories');
var caloriesLeft = coloriesLeft;
function itemClicked(event) {
    //Find "calories" class from target child, and parse it to a float
    var caloriesChild = parseFloat(event.target.querySelector(".calories").textContent);
    //Subtract the value of caloriesChild from caloriesLeft
    caloriesLeft -= caloriesChild;
    if(caloriesLeft < 0){
        caloriesLeft = 0;
        alert("no more calories left for the day");
    }

    //Output the reamaining value from caloriesLeft to the console 
    console.log(Math.floor(caloriesLeft));
}
var repoContainerEl = document.querySelector('#issues-container');
var place = document.querySelector("#place");

function menu() {
    var restaurant = window.location.search.replace('?restaurant=', '');
    if (!restaurant) {
        window.location.href = './index.html';
    }
   
    var url = "https://api.nutritionix.com/v1_1/search/" + restaurant + "?results=0:50&fields=item_name,brand_name,item_id,nf_calories&appId=713936a2&appKey=78f575a6b73c1e3d938c41c8b6ea3ae0";
 fetch(url)
  .then(function(reponse){
      return reponse.json();
  })
  .then(function(data){
      console.log(data);
      for (var i=0; i<data.hits.length; i++){
      
          var itemEl =data.hits[i].fields.item_name;
          var calories = data.hits[i].fields.nf_calories;
          place.textContent= data.hits[i].fields.brand_name;
          
        //   console.log(itemEl);
          var restEl = document.createElement('a');
                restEl.classList = 'list-item flex-row justify-space-between align-center';
                

                // create a span element to hold menu item name  calor
                var caloricEl = document.createElement('span')
                var menuItem = document.createElement('span');
                menuItem.classList='subtitle';
                caloricEl.textContent = calories + " calories " ;
                menuItem.textContent = itemEl;
                caloricEl.classList.add("calories");
                restEl.addEventListener("click", itemClicked);
                

                // append to container
                restEl.appendChild(menuItem);
                restEl.appendChild(caloricEl);
                
                repoContainerEl.appendChild(restEl);
      }
 
   
});
    
};
menu();
var btn = document.querySelector("#backBtn");
btn.setAttribute('href', "./index.html")
btn.addEventListener('click',function(){
 
})





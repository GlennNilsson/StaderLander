var div = document.getElementById('container');
var div2 = document.getElementById('container2');
var obj
var uservisit = [];
var user;
var array;

document.getElementById("header").innerHTML = "" + 
"<span id='topp'>" +
"<h1 class='font-effect-shadow-multiple'>Städer<img id='bild' src='./bildsverige.png' alt='Sverige' width=200 height=210></a></h1>" + 
"</span>" +
"<hr>" +

"<nav class='navmenu gradient'>" +
"<a id='pl-' onclick='Start()'>Start  <i class='far fa-envelope'></i></a>" +
"<a id='cv-' onclick='Country()'>Länder  <i class='fas fa-briefcase'></i></a>" +
"<a id='cv-' onclick='getvisitedCities()'>Besökta Städer  <i class='fas fa-briefcase'></i></a>" +
"</nav>"

document.getElementById("footer").innerHTML = "" +
"<div id='margin'>" +
"<div id='footer'>" +
  "<hr></hr>" +
  "<p>Länkar:" +
  "<a href='https://github.com/GlennNilsson/StaderLander'>Glenns GitHub</a>" + 
  "    <a href='https://glennnilsson.github.io/StaderLander/index.html' >Glenns Städer Länder</a>" +
  "</p>" +
"</div>" +
"</div>"

document.getElementById("container").innerHTML = "" ;
document.getElementById("container").innerHTML = "" +
"<h2 class ='font-effect-shadow-multiple start' class='font-effect-shadow-multiple'>Välkommen till Länder och Städer.</h2>" +
"<p>Välj Länder i Menyn och där efter det land du är intresserad av</p><br></br>"+
"<p>Välj därefter den stad du är intresserad av</p>";

function Start()
{
  document.getElementById("container").innerHTML = "" +
  "<h2 class ='font-effect-shadow-multiple start' class='font-effect-shadow-multiple'>Välkommen till Länder och Städer.</h2>" +
"<p>Välj Länder i Menyn och där efter det land du är intresserad av</p><br></br>"+
"<p>Välj därefter den stad du är intresserad av</p>";
  document.getElementById("container2").innerHTML = "";

}

function Country()
{
  document.getElementById("container").innerHTML = "" ;
  document.getElementById("container").innerHTML = "" +
  "<h2 class='font-effect-shadow-multiple start'>Länder</h2>";
  GetData();
}

function City(id, c)
{
  
  document.getElementById("container").innerHTML = "" +
  "<h2 id='rub' class='font-effect-shadow-multiple start'>Länder</h2>";
  div.innerHTML += "<ul id='ul'></ul>";
  fetch('stad.json')
  .then(response => response.json())
  .then(data => 
    {
      for(i=0; i<data.length; i++)
      {
            if(data[i].countryid === id)
            {
                ul.innerHTML += "<li class='stad' onclick='Citydata(" + JSON.stringify(data[i].stadname + '    Finns i landet:' + c + '  antal invånare:' + data[i].population ) + ", " + data[i].id + ")'> Stad: " + data[i].stadname + "</li>"
            }
        
        
      }
      console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });    
 
}

function GetData()
{
  document.getElementById("container").innerHTML = "" +
  "<h2 id='rub' class='font-effect-shadow-multiple start'>Städer</h2>";
  div.innerHTML += "<ul id='ul'></ul>";
  fetch('land.json')
  .then(response => response.json())
  .then(data => 
    {
      for(i=0; i<data.length; i++)
      {
        ul.innerHTML += "<li class='stad' onclick='City(" + data[i].id + ", " + JSON.stringify(data[i].countryname) + ")'>" + data[i].countryname +"</li>"
      }
      console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });     
}

function Citydata(city, id)
{
  document.getElementById("container").innerHTML = "" +
  "<h2 id='rub' class='font-effect-shadow-multiple start'>Städer</h2>";
  div.innerHTML += "<p>" + city + "</p><br></br>";
  div.innerHTML += "<button id='but' onclick='SaveCity(" + user + "," + id + ")' type='button'>Den Staden har jag besökt</button>";
  document.getElementById("container2").innerHTML = "" ;
}

function SaveCity(User, Id)
{
  document.getElementById("container").innerHTML = "" ;
  div.innerHTML += "<h2>Städer du har Besökt:</h2>";
  div.innerHTML += "<ul id='ul'></ul>";
  var Population = 0;
  if(uservisit === null){ uservisit = [];}
  if(!uservisit.includes(Id))
  {
    uservisit.push(Id) 
    localStorage.setItem("User", JSON.stringify(uservisit)); 
    console.log(localStorage.getItem("User")); 
    fetch('stad.json')
    .then(response => response.json())
    .then(data => 
      {
        array = JSON.parse(localStorage.getItem("User"));
        for(j=0; j<array.length; j++)
        {
          
          for(i=0; i<data.length; i++)
          {
                if(data[i].id === array[j])
                {
                    ul.innerHTML += "<li class='stadvisited'> Stad: " + data[i].stadname + "</li>"
                    
                    Population = Population + data[i].population;
                }          
          }
        }
        console.log(data);
        div.innerHTML += "<p> Summa antal invånare: " + Population + "</p>";
        document.getElementById("container2").innerHTML = "" ;
        div2.innerHTML += "<button id='but' onclick='cleardata()' type='button'>Radera besökta Städer</button>";       
      })
      .catch((err) => {
          console.log(err);
      }); 
      
    }
    else{getvisitedCities();}
    
}

function cleardata()
{
  localStorage.clear();
  array.length = 0;
  uservisit.length = 0;
  location.reload(); 
}
console.log(localStorage.getItem("User")); 
uservisit = JSON.parse(localStorage.getItem("User"));

function getvisitedCities()
{
  var population = 0;
  document.getElementById("container").innerHTML = "" +
  "<h2 id='rub' class='font-effect-shadow-multiple start'>Visited Cities</h2>";
  div.innerHTML += "<ul id='ul'></ul>";
  
  document.getElementById("container2").innerHTML = "";
  fetch('stad.json')
  .then(response => response.json())
  .then(data => 
    {
      array = JSON.parse(localStorage.getItem("User"));
      for(j=0; j<array.length; j++)
      {
        
        for(i=0; i<data.length; i++)
        {
              if(data[i].id === array[j])
              {
                  ul.innerHTML += "<li class='stadvisited'> Stad: " + data[i].stadname + "</li>"
                  population = population + data[i].population;
              }          
        }
      }
      console.log(data);
      div.innerHTML += "<p> Summa antal invånare: " + population + "</p>";
      div2.innerHTML += "<button id='but' onclick='cleardata()' type='button'>Radera besökta Städer</button>";
    })
    .catch((err) => {
        console.log(err);
    }); 
}

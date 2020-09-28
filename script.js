var div = document.getElementById('container');
var obj
let uservisit = [];
var user;

document.getElementById("header").innerHTML = "" + 
"<span id='topp'>" +
"<h1 class='font-effect-shadow-multiple'>Countries<img id='bild' src='./bildsverige.png' alt='Sverige' width=200 height=210></a></h1>" + 
"</span>" +
"<hr>" +

"<nav class='navmenu gradient'>" +
"<a id='pl-' onclick='Start()'>Start  <i class='far fa-envelope'></i></a>" +
"<a id='cv-' onclick='Country()'>Country  <i class='fas fa-briefcase'></i></a>" +
"</nav>"

document.getElementById("footer").innerHTML = "" +
"<div id='margin'>" +
"<div id='footer'>" +
  "<hr></hr>" +
  "<p>Länkar:" +
  "<a href='https://github.com/GlennNilsson/CV'>Glenns GitHub</a>" + 
  "    <a href='https://glennnilsson.github.io/CV/.' >Glenns Homepage</a>" +
  "</p>" +
"</div>" +
"</div>"

document.getElementById("container").innerHTML = "" ;
document.getElementById("container").innerHTML = "" +
"<h2 class ='font-effect-shadow-multiple start' class='font-effect-shadow-multiple'>Welcome to my homepage.</h2>" +
"<p>Please select what you would like to read in the Navigation bar in the top.</p>";

function Start()
{
  document.getElementById("container").innerHTML = "" ;
  document.getElementById("container").innerHTML = "" +
  "<h2 class='font-effect-shadow-multiple start'>Välkommen till Städer och länder</h2>" +
  "<label>Användarnamn:</label>"
  "<input type='text' id='user'><br><br>"
  "<label>Last name:</label>"
  "<input type='text' id='password'><br><br>"
  "<button id='Loggain' type='button'>Logga in</button>";

}

function Country()
{
  document.getElementById("container").innerHTML = "" ;
  document.getElementById("container").innerHTML = "" +
  "<h2 class='font-effect-shadow-multiple start'>Länder</h2>";
  GetData();
}

function City(id)
{
  
  document.getElementById("container").innerHTML = "" +
  "<h2 class='font-effect-shadow-multiple start'>City</h2>";
  div.innerHTML += "<ul id='ul'></ul>";
  fetch('stad.json')
  .then(response => response.json())
  .then(data => 
    {
      for(i=0; i<data.length; i++)
      {
            if(data[i].countryid === id)
            {
                ul.innerHTML += "<li onclick='Citydata(" + JSON.stringify(data[i].stadname + '     antal inevånare:' + data[i].population ) + ", " + data[i].id + ")'> Stad: " + data[i].stadname + "</li>"
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
  document.getElementById("container").innerHTML = "" ;
  div.innerHTML += "<ul id='ul'></ul>";
  fetch('land.json')
  .then(response => response.json())
  .then(data => 
    {
      for(i=0; i<data.length; i++)
      {
        ul.innerHTML += "<li onclick='City(" + data[i].id + ")'>" + data[i].countryname +"</li>"
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
  "<h2 class='font-effect-shadow-multiple start'>City</h2>";
  div.innerHTML += "<p>" + city + "</p><br></br>";
  div.innerHTML += "<button onclick='SaveCity(" + user + "," + id + ")' type='button'>Den Staden har jag besökt</button>";
}

function SaveCity(User, Id)
{
  uservisit.push(User, Id); 
  localStorage.setItem("Glenn", stringify(uservisit));
  console.log(uservisit);
  div.innerHTML += "<p>" + localStorage.getItem("Glenn")+ "</p><br></br>";
}
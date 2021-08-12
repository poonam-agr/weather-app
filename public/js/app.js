var fetchWeather='/weather';

const weatherForm=document.querySelector('form');
const search =document.querySelector('input');

const weatherIcon =document.querySelector('.weatherIcon img');
const weatherCondition =document.querySelector('.weatherCondition');

const tempElement = document.querySelector('.temperature span');

const locationElement = document.querySelector('.place');

const dateElement = document.querySelector('.date');

//const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

//dateElement.textContent=new Date().getDate() + ","+monthNames[new Date().getMonth()].substring(0,3);
dateElement.textContent = (new Date(Date.now())).toLocaleDateString('en-US',{day: 'numeric', month: 'short'});



weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    locationElement.textContent = "Loading...";
    tempElement.textContent = "";
    weatherCondition.textContent = "";
    const locationApi=fetchWeather + "?address="+search.value;
    fetch(locationApi).then(response => {
        response.json().then(data => {
            if(data.error) {
                locationElement.textContent = data.error;
                tempElement.textContent = "";
                weatherCondition.textContent = "";
            } else {               
                console.log(data);
                weatherIcon.src = "http://openweathermap.org/img/wn/"+data.icon+"@4x.png";
                locationElement.textContent = data.cityName;
                tempElement.textContent = (data.temperature - 273.5).toFixed(2) + String.fromCharCode(176);
                weatherCondition.textContent = data.description.toUpperCase();
                //console.log(Date.now());
                console.log(new Date(( Date.now())+(data.timeZone-19800)*1000));
                dateElement.textContent= new Date(( Date.now())+(data.timeZone-19800)*1000).toLocaleDateString('en-US',{day: 'numeric', month: 'short'});                
                //dateElement.textContent= new Date((data.dateRegion)*1000).toLocaleDateString('en-US',{day: 'numeric', month: 'short'});                
            }
        }) 
    });

})
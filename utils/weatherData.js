const request=require('request');
const constant = require('../config');
const constants=require('../config');


const weatherData=(address,callback)=>{
    const url=constants.openWeatherMap.BASE_URL+encodeURIComponent(address)+'&appid='+constants.openWeatherMap.SECRET_KEY;
    //console.log(url);
    request({url,json:true},(error,{body})=>{
        //console.log(body);
        if(error){
            callback("Can't fetch data from open weather map app ",undefined);
        }else if(!body.main){
            callback("Unable to find required data, try another location");
        }else{
            callback(undefined,{
                temperature:body.main.temp,
                description:body.weather[0].description,
                cityName:body.name,
                icon:body.weather[0].icon,
                timeZone:body.timezone,
                dateRegion:body.dt

            })
        }
    })

}
module.exports=weatherData;
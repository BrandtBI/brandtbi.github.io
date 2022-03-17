//////////////////////////////////////////////////////////////////
////// Open Weather API 
/////  https://openweathermap.org/
/////  Created by Stephanie Davis
/////  Modified on 3/16/2022
//////////////////////////////////////////////////////////////////
/////  One Call API
/////  Daily Forecast for 7 days for 38 South Dakota Facility Cities
/////////////////////////////////////////////////////////////////// 


(function () {

    var myConnector = tableau.makeConnector();
	
	myConnector.getSchema = function (schemaCallback) {
       
        var cols = [
        { id : "city", alias : "City", dataType : tableau.dataTypeEnum.string},
        { id : "lat", alias : "Latitude",  dataType : tableau.dataTypeEnum.float},
        { id : "lon", alias : "Longitude",  dataType : tableau.dataTypeEnum.float},
        { id : "dt", alias : "Time Forecasted",  dataType : tableau.dataTypeEnum.datetime},
     //  { id : "day", alias : "Temperature",  dataType : tableau.dataTypeEnum.float},
        { id : "min", alias : "Min Temp",  dataType : tableau.dataTypeEnum.datetime},
        { id : "max", alias : "Max Temp",  dataType : tableau.dataTypeEnum.float},
        { id : "moonPhase", alias : "Moon Phase",  dataType : tableau.dataTypeEnum.float},
        { id : "humidity", alias : "Humidity", dataType : tableau.dataTypeEnum.float},
        { id : "windSpeed", alias : "Wind Speed", dataType : tableau.dataTypeEnum.float},
        { id : "pop", alias : "Rain Probability", dataType : tableau.dataTypeEnum.float},
        { id : "rain", alias : "Rain Volume", dataType : tableau.dataTypeEnum.float},
        { id : "snow", alias : "Snow Volume", dataType : tableau.dataTypeEnum.float},
        { id : "description", alias : "Weather Description", dataType : tableau.dataTypeEnum.string},
        { id : "icon", alias : "Icon", dataType : tableau.dataTypeEnum.string}
       ];

	var tableSchema = {
		id : "dailyForecast",
		alias : "5 Day Weather Forecast",
		columns : cols,
      //  incrementColumnId: "dt"
		};
    
	schemaCallback([tableSchema]);
    };

	myConnector.getData = function(table, doneCallback) {
      //  var lastDt = parseInt(table.incrementColumnId || -1);
        var tableData=[];
    
//////////// ABERDEEN /////
        
	$.getJSON("https://api.openweathermap.org/data/2.5/onecall?lat=44.36832&lon=-100.350967&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
       
       var lat = -98.486481;
       var lon = 45.464699;
       var city = "Aberdeen";
       var zip = 57401;
       var daily = data.daily;
       tableData = [];
      //for each result write entry
       for (var i = 0, len = daily.length; i < len; i++) {
       tableData.push({
           "city":city,
            "zip":zip,
            "lat":lat,
            "lon":lon,    
           "dt":daily[i].dt, 
          //  "temp":daily[i].temp.day,
            "min":daily[i].temp.min,
            "max":daily[i].temp.max,
            "moonPhase":daily[i].moon_phase,
            "windSpeed":daily[i].wind_speed,
            "description":daily[i].weather.description,
            "icon":daily[i].weather.icon
            
        });
        }    
    
     	table.appendRows(tableData);
	 	});
     


// ///////// CUSTER
       
// 	$.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-103.58808&lat=43.766651&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//         var lon = -103.598808;
//         var lat = -43.766651;
//         var zip = 57730;
//         var city = "Custer";
//         var daily = data.daily;
//         tableData = [];
//       //for each result write entry
//         for (var i = 0, len = daily.length; i < len; i++) {
//         tableData.push({
//             "city":city,
//             "zip":zip,
//             "lat":lat,
//             "lon":lon,    
//             "dt":daily[i].dt, 
//            // "temp":daily[i].temp.day,
//             "min":daily[i].temp.min,
//             "max":daily[i].temp.max,
//             "moonPhase":daily[i].moon_phase,
//             "windSpeed":daily[i].wind_speed,
//             "description":daily[i].weather.description,
//             "icon":daily[i].weather.icon
            
//         });
//     };  
    
//         table.appendRows(tableData);
//          });


// ////////// MOBRIDGE
//     $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-100.42791&lat=45.53722&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//         var lon = -100.42791;
//         var lat = 45.53722;
//         var city = "Mobridge";
//         var zip = 57601;
//         var daily = data.daily;
//         tableData = [];
//       //for each result write entry
//       for (var i = 0, len = daily.length; i < len; i++) {
//        tableData.push({
//             "city":city,
//             "zip":zip,
//             "lat":lat,
//             "lon":lon,    
//             "dt":daily[i].dt, 
//           //  "temp":daily[i].temp.day,
//             "min":daily[i].temp.min,
//             "max":daily[i].temp.max,
//             "moonPhase":daily[i].moon_phase,
//             "windSpeed":daily[i].wind_speed,
//             "description":daily[i].weather.description,
//             "icon":daily[i].weather.icon
            
//         });
//     };  
    
//         table.appendRows(tableData);
//          });   
    
// ////////// BROOKINGS
//   $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-96.798393&lat=44.311359&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//     var lon = -96.798393;
//     var lat = 44.311359;
//     var city = "Brookings";
//     var zip = 57220;
//     var daily = data.daily;
//     tableData = [];
//   //for each result write entry
//    for (var i = 0, len = daily.length; i < len; i++) {
//    tableData.push({
//         "city":city,
//         "zip":zip,
//         "lat":lat,
//         "lon":lon,    
//         "dt":daily[i].dt, 
//         "temp":daily[i].temp.day,
//         "min":daily[i].temp.min,
//         "max":daily[i].temp.max,
//         "moonPhase":daily[i].moon_phase,
//         "windSpeed":daily[i].wind_speed,
//         "description":daily[i].weather.description,
//         "icon":daily[i].weather.icon
        
//     });
// };  

//     table.appendRows(tableData);
//      });  
     
     
// ////////// DEADWOOD
//   $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-103.729637&lat=44.376652&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//     var lon = -103.729637;
//     var lat = 44.376652;
//     var city = "Deadwood";
//     var zip = "57732";
//     var daily = data.daily;
//     tableData = [];
//   //for each result write entry
//    for (var i = 0, len = daily.length; i < len; i++) {
//    tableData.push({
//         "city":city,
//         "zop":zip,
//         "lat":lat,
//         "lon":lon,    
//         "dt":daily[i].dt, 
//         "temp":daily[i].temp.day,
//         "min":daily[i].temp.min,
//         "max":daily[i].temp.max,
//         "moonPhase":daily[i].moon_phase,
//         "windSpeed":daily[i].wind_speed,
//         "description":daily[i].weather.description,
//         "icon":daily[i].weather.icon
        
//     });
// };  

//     table.appendRows(tableData);
//      });   


// ////////// BERESFORD
// $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-96.773659&lat=43.08054&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//     var lon = -96.773659;
//     var lat = 43.08054;
//     var city = "Beresford";
//     var zip = 57004;
//     var daily = data.daily;
//     tableData = [];
//   //for each result write entry
//   for (var i = 0, len = daily.length; i < len; i++) {
//    tableData.push({
//        "city":city,
//         "zip":zip,
//         "lat":lat,
//         "lon":lon,    
//         "dt":daily[i].dt, 
//         "temp":daily[i].temp.day,
//         "min":daily[i].temp.min,
//         "max":daily[i].temp.max,
//         "moonPhase":daily[i].moon_phase,
//         "windSpeed":daily[i].wind_speed,
//         "description":daily[i].weather.description,
//         "icon":daily[i].weather.icon
        
//     });
// };  

//     table.appendRows(tableData);
//      });   



     
// ////////// BURKE
// $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-99.292053&lat=43.182499&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//     var lon = -99.292053;
//     var lat = 43.182499;
//     var city = "Burke";
//     var zip = "57523";
//     var daily = data.daily;
//     tableData = [];
//   //for each result write entry
//   for (var i = 0, len = daily.length; i < len; i++) {
//    tableData.push({
//         "city":city,
//         "zip":zip,
//         "lat":lat,
//         "lon":lon,    
//         "dt":daily[i].dt, 
//         "temp":daily[i].temp.day,
//         "min":daily[i].temp.min,
//         "max":daily[i].temp.max,
//         "moonPhase":daily[i].moon_phase,
//         "windSpeed":daily[i].wind_speed,
//         "description":daily[i].weather.description,
//         "icon":daily[i].weather.icon
        
//     });
// };  

//     table.appendRows(tableData);
//      });   


     
// ////////// BRANDON
// $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-96.571991&lat=43.5947&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//     var lon = -96.571991;
//     var lat = 43.5947;
//     var city = "Brandon";
//     var zip = "57005";
//     var daily = data.daily;
//     tableData = [];
//   //for each result write entry
// for (var i = 0, len = daily.length; i < len; i++) {
//    tableData.push({
//         "city":city,
//         "zip":zip,
//         "lat":lat,
//         "lon":lon,    
//         "dt":daily[i].dt, 
//         "temp":daily[i].temp.day,
//         "min":daily[i].temp.min,
//         "max":daily[i].temp.max,
//         "moonPhase":daily[i].moon_phase,
//         "windSpeed":daily[i].wind_speed,
//         "description":daily[i].weather.description,
//         "icon":daily[i].weather.icon
        
//     });
// };  

//     table.appendRows(tableData);
//      });   


     
     
// ////////// SIOUX FALLS
// $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-96.700333&lat=43.549969&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//     var lon = -96.700333;
//     var lat = 43.549969;
//     var city = "Sioux Falls";
//     var zip = "57108";
//     var daily = data.daily;
//     tableData = [];
//   //for each result write entry
//    for (var i = 0, len = daily.length; i < len; i++) {
//    tableData.push({
//         "city":city,
//         "zip":zip,
//         "lat":lat,
//         "lon":lon,    
//         "dt":daily[i].dt, 
//         "temp":daily[i].temp.day,
//         "min":daily[i].temp.min,
//         "max":daily[i].temp.max,
//         "moonPhase":daily[i].moon_phase,
//         "windSpeed":daily[i].wind_speed,
//         "description":daily[i].weather.description,
//         "icon":daily[i].weather.icon
        
//     });
// };  

//     table.appendRows(tableData);
//      });   


// ////////// WATERTOWN
// $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-97.115067&lat=44.89941&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//     var lon = -97.115067;
//     var lat = 44.89941;
//     var city = "Watertown";
//     var zip = 57227;
//     var daily = data.daily;
//     tableData = [];
//   //for each result write entry
//    for (var i = 0, len = daily.length; i < len; i++) {
//    tableData.push({
//         "city":city,
//         "zip":zip,
//         "lat":lat,
//         "lon":lon,    
//         "dt":daily[i].dt, 
//         "temp":daily[i].temp.day,
//         "min":daily[i].temp.min,
//         "max":daily[i].temp.max,
//         "moonPhase":daily[i].moon_phase,
//         "windSpeed":daily[i].wind_speed,
//         "description":daily[i].weather.description,
//         "icon":daily[i].weather.icon
        
//     });
// };  

//     table.appendRows(tableData);
//      });   


// ///////// FORT PIERRE
//      $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-100.373741&lat=44.353588&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//     var lon = -100.373741;
//     var lat = 44.353588;
//     var city = "Fort Pierre";
//     var zip = "57532";
//     var daily = data.daily;
//     tableData = [];
//   //for each result write entry
// for (var i = 0, len = daily.length; i < len; i++) {
//    tableData.push({
//         "city":city,
//         "zip":zip,
//         "lat":lat,
//         "lon":lon,    
//         "dt":daily[i].dt, 
//         "temp":daily[i].temp.day,
//         "min":daily[i].temp.min,
//         "max":daily[i].temp.max,
//         "moonPhase":daily[i].moon_phase,
//         "windSpeed":daily[i].wind_speed,
//         "description":daily[i].weather.description,
//         "icon":daily[i].weather.icon
        
//     });
// };  

//     table.appendRows(tableData);
//      });   



// ///////// CLEAR LAKE
// $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-96.682564&lat=44.7458&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//     var lon = -96.682564;
//     var lat = 44.7458;
//     var city = "Clear Lake";
//     var zip = 57226;
//     var daily = data.daily;
//     tableData = [];
//   //for each result write entry
//    for (var i = 0, len = daily.length; i < len; i++) {
//    tableData.push({
        
//         "city":city,
//         "zip":zip,
//         "lat":lat,
//         "lon":lon,    
//         "dt":daily[i].dt, 
//         "temp":daily[i].temp.day,
//         "min":daily[i].temp.min,
//         "max":daily[i].temp.max,
//         "moonPhase":daily[i].moon_phase,
//         "windSpeed":daily[i].wind_speed,
//         "description":daily[i].weather.description,
//         "icon":daily[i].weather.icon
        
//     });
// };  

//     table.appendRows(tableData);
//      });   

// ///////// PLATTE
// $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-98.844528&lat=43.38694&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//     var lon = -98.844528;
//     var lat = 43.38694;
//     var city = "Platte";
//     var zip = 57369;
//     var daily = data.daily;
//     tableData = [];
//   //for each result write entry

//    for (var i = 0, len = daily.length; i < len; i++) {
//    tableData.push({
//         "city":city,
//         "zip":zip,
//         "lat":lat,
//         "lon":lon,    
//         "dt":daily[i].dt, 
//         "temp":daily[i].temp.day,
//         "min":daily[i].temp.min,
//         "max":daily[i].temp.max,
//         "moonPhase":daily[i].moon_phase,
//         "windSpeed":daily[i].wind_speed,
//         "description":daily[i].weather.description,
//         "icon":daily[i].weather.icon
        
//     });
// };  

//     table.appendRows(tableData);
//      }); 

// ///////// GETTYSBURG
// $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-99.955673&lat=45.01165&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//     var lon = -99.955673;
//     var lat = 45.01165;
//     var city = "Gettysburg";
//     var zip = 57442;
//     var daily = data.daily;
//     tableData = [];
//   //for each result write entry
// for (var i = 0, len = daily.length; i < len; i++) {
//    tableData.push({
//         "city":city,
//         "zip":zip,
//         "lat":lat,
//         "lon":lon,    
//         "dt":daily[i].dt, 
//         "temp":daily[i].temp.day,
//         "min":daily[i].temp.min,
//         "max":daily[i].temp.max,
//         "moonPhase":daily[i].moon_phase,
//         "windSpeed":daily[i].wind_speed,
//         "description":daily[i].weather.description,
//         "icon":daily[i].weather.icon
        
//     });
// };  

//     table.appendRows(tableData);
//      }); 

// ///////// WEBSTER
// $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-97.520088&lat=45.33218&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//     var lon = -97.520088;
//     var lat = 45.33218;
//     var city = "Webster";
//     var zip = 57442;
//     var daily = data.daily;
//     tableData = [];
//   //for each result write entry
// for (var i = 0, len = daily.length; i < len; i++) {
//    tableData.push({
//         "city":city,
//         "zip":zip,
//         "lat":lat,
//         "lon":lon,    
//         "dt":daily[i].dt, 
//         "temp":daily[i].temp.day,
//         "min":daily[i].temp.min,
//         "max":daily[i].temp.max,
//         "moonPhase":daily[i].moon_phase,
//         "windSpeed":daily[i].wind_speed,
//         "description":daily[i].weather.description,
//         "icon":daily[i].weather.icon
        
//     });
// };  

//     table.appendRows(tableData);
//      }); 



// ///////// HARRISBURG
// $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-96.697273&lat=43.43137&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//     var lon = -96.697273;
//     var lat = 43.43137;
//     var city = "Harrisburg";
//     var zip = 57032;
//     var daily = data.daily;
//     tableData = [];
//   //for each result write entry
// for (var i = 0, len = daily.length; i < len; i++) {
//    tableData.push({
//         "city":city,
//         "zip":zip,
//         "lat":lat,
//         "lon":lon,    
//         "dt":daily[i].dt, 
//         "temp":daily[i].temp.day,
//         "min":daily[i].temp.min,
//         "max":daily[i].temp.max,
//         "moonPhase":daily[i].moon_phase,
//         "windSpeed":daily[i].wind_speed,
//         "description":daily[i].weather.description,
//         "icon":daily[i].weather.icon
        
//     });
// };  

//     table.appendRows(tableData);
//      }); 

// ///////// HIGHMORE
// $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-99.441498&lat=44.52137&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//     var lon = -99.441498;
//     var lat = 44.52137;
//     var city = "Highmore";
//     var zip = 57345;
//     var daily = data.daily;
//     tableData = [];
//   //for each result write entry
// for (var i = 0, len = daily.length; i < len; i++) {
//    tableData.push({
//         "city":city,
//         "zip":zip,
//         "lat":lat,
//         "lon":lon,    
//         "dt":daily[i].dt, 
//         "temp":daily[i].temp.day,
//         "min":daily[i].temp.min,
//         "max":daily[i].temp.max,
//         "moonPhase":daily[i].moon_phase,
//         "windSpeed":daily[i].wind_speed,
//         "description":daily[i].weather.description,
//         "icon":daily[i].weather.icon
        
//     });
// };  

//     table.appendRows(tableData);
//      }); 


// ///////// HOT SPRINGS
// $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-103.474358&lat=43.431648&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//     var lon = -103.474358;
//     var lat = 43.431648;
//     var city = "Hot Springs";
//     var zip = 57747;
//     var daily = data.daily;
//     tableData = [];
//   //for each result write entry
// for (var i = 0, len = daily.length; i < len; i++) {
//    tableData.push({
//         "city":city,
//         "zip":zip,
//         "lat":lat,
//         "lon":lon,    
//         "dt":daily[i].dt, 
//         "temp":daily[i].temp.day,
//         "min":daily[i].temp.min,
//         "max":daily[i].temp.max,
//         "moonPhase":daily[i].moon_phase,
//         "windSpeed":daily[i].wind_speed,
//         "description":daily[i].weather.description,
//         "icon":daily[i].weather.icon
        
//     });
// };  

//     table.appendRows(tableData);
//      }); 

// ///////// LAKE ANDES
// $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-98.541473&lat=43.15638&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//     var lon = -98.541473;
//     var lat = 43.15638;
//     var city = "Lake Andes";
//     var zip = 57356;
//     var daily = data.daily;
//     tableData = [];
//   //for each result write entry
// for (var i = 0, len = daily.length; i < len; i++) {
//    tableData.push({
//         "city":city,
//         "zip":zip,
//         "lat":lat,
//         "lon":lon,    
//         "dt":daily[i].dt, 
//         "temp":daily[i].temp.day,
//         "min":daily[i].temp.min,
//         "max":daily[i].temp.max,
//         "moonPhase":daily[i].moon_phase,
//         "windSpeed":daily[i].wind_speed,
//         "description":daily[i].weather.description,
//         "icon":daily[i].weather.icon
        
//     });
// };  

//     table.appendRows(tableData);
//      }); 


// ///////// BRITTON
// $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-97.750938&lat=45.791618&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//     var lon = -97.750938;
//     var lat = 45.791618;
//     var city = "Britton";
//     var zip = 57430;
//     var daily = data.daily;
//     tableData = [];
//   //for each result write entry
// for (var i = 0, len = daily.length; i < len; i++) {
//    tableData.push({
//         "city":city,
//         "zip":zip,
//         "lat":lat,
//         "lon":lon,    
//         "dt":daily[i].dt, 
//         "temp":daily[i].temp.day,
//         "min":daily[i].temp.min,
//         "max":daily[i].temp.max,
//         "moonPhase":daily[i].moon_phase,
//         "windSpeed":daily[i].wind_speed,
//         "description":daily[i].weather.description,
//         "icon":daily[i].weather.icon
        
//     });
// };  

//     table.appendRows(tableData);
//      }); 


// ///////// DE SMET
// $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-97.550346&lat=44.38747&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//     var lon = -97.550346;
//     var lat = 44.38747;
//     var city = "De Smet";
//     var zip = 57231;
//     var daily = data.daily;
//     tableData = [];
//   //for each result write entry
// for (var i = 0, len = daily.length; i < len; i++) {
//    tableData.push({
//         "city":city,
//         "zip":zip,
//         "lat":lat,
//         "lon":lon,    
//         "dt":daily[i].dt, 
//         "temp":daily[i].temp.day,
//         "min":daily[i].temp.min,
//         "max":daily[i].temp.max,
//         "moonPhase":daily[i].moon_phase,
//         "windSpeed":daily[i].wind_speed,
//         "description":daily[i].weather.description,
//         "icon":daily[i].weather.icon
        
//     });
// };  

//     table.appendRows(tableData);
//      }); 

// ///////// LEAD
// $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-103.765198&lat=44.352211&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//     var lon = -103.765198;
//     var lat = 44.352211;
//     var city = "Lead";
//     var zip = 57754;
//     var daily = data.daily;
//     tableData = [];
//   //for each result write entry
// for (var i = 0, len = daily.length; i < len; i++) {
//    tableData.push({
//         "city":city,
//         "zip":zip,
//         "lat":lat,
//         "lon":lon,    
//         "dt":daily[i].dt, 
//         "temp":daily[i].temp.day,
//         "min":daily[i].temp.min,
//         "max":daily[i].temp.max,
//         "moonPhase":daily[i].moon_phase,
//         "windSpeed":daily[i].wind_speed,
//         "description":daily[i].weather.description,
//         "icon":daily[i].weather.icon
        
//     });
// };  

//     table.appendRows(tableData);
//      }); 

// ///////// MADISON
// $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-97.113953&lat=44.006081&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//     var lon = -97.113953;
//     var lat = 44.006081;
//     var city = "Lead";
//     var zip = 57042;
//     var daily = data.daily;
//     tableData = [];
//   //for each result write entry
// for (var i = 0, len = daily.length; i < len; i++) {
//    tableData.push({
//         "city":city,
//         "zip":zip,
//         "lat":lat,
//         "lon":lon,    
//         "dt":daily[i].dt, 
//         "temp":daily[i].temp.day,
//         "min":daily[i].temp.min,
//         "max":daily[i].temp.max,
//         "moonPhase":daily[i].moon_phase,
//         "windSpeed":daily[i].wind_speed,
//         "description":daily[i].weather.description,
//         "icon":daily[i].weather.icon
        
//     });
// };  

//     table.appendRows(tableData);
//      }); 


// ///////// NORTH SIOUX CITY
// $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-96.483093&lat=42.527222&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//     var lon = -96.483093;
//     var lat = 42.527222;
//     var city = "Lead";
//     var zip = 57049;
//     var daily = data.daily;
//     tableData = [];
//   //for each result write entry
// for (var i = 0, len = daily.length; i < len; i++) {
//    tableData.push({
//         "city":city,
//         "zip":zip,
//         "lat":lat,
//         "lon":lon,    
//         "dt":daily[i].dt, 
//         "temp":daily[i].temp.day,
//         "min":daily[i].temp.min,
//         "max":daily[i].temp.max,
//         "moonPhase":daily[i].moon_phase,
//         "windSpeed":daily[i].wind_speed,
//         "description":daily[i].weather.description,
//         "icon":daily[i].weather.icon
        
//     });
// };  

//     table.appendRows(tableData);
//      }); 

// ///////// MILLER
// $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-98.988426&lat=44.518311&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//     var lon = -98.988426;
//     var lat = 44.518211;
//     var city = "Lead";
//     var zip = 57362;
//     var daily = data.daily;
//     tableData = [];
//   //for each result write entry
// for (var i = 0, len = daily.length; i < len; i++) {
//    tableData.push({
//         "city":city,
//         "zip":zip,
//         "lat":lat,
//         "lon":lon,    
//         "dt":daily[i].dt, 
//         "temp":daily[i].temp.day,
//         "min":daily[i].temp.min,
//         "max":daily[i].temp.max,
//         "moonPhase":daily[i].moon_phase,
//         "windSpeed":daily[i].wind_speed,
//         "description":daily[i].weather.description,
//         "icon":daily[i].weather.icon
        
//     });
// };  

//     table.appendRows(tableData);
//      }); 

// ///////// MILBANK
// $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-96.63562&lat=45.219131&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//     var lon = -96.63562;
//     var lat = 45.219131;
//     var city = "Milbank";
//     var zip = 57252;
//     var daily = data.daily;
//     tableData = [];
//   //for each result write entry
// for (var i = 0, len = daily.length; i < len; i++) {
//    tableData.push({
//         "city":city,
//         "zip":zip,
//         "lat":lat,
//         "lon":lon,    
//         "dt":daily[i].dt, 
//         "temp":daily[i].temp.day,
//         "min":daily[i].temp.min,
//         "max":daily[i].temp.max,
//         "moonPhase":daily[i].moon_phase,
//         "windSpeed":daily[i].wind_speed,
//         "description":daily[i].weather.description,
//         "icon":daily[i].weather.icon
        
//     });
// };  

//     table.appendRows(tableData);
//      }); 

// ///////// PIERRE
// $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-100.350967&lat=44.36832&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//     var lon = -100.350967;
//     var lat = 44.36832;
//     var city = "Pierre";
//     var zip = 57501;
//     var daily = data.daily;
//     tableData = [];
//   //for each result write entry
// for (var i = 0, len = daily.length; i < len; i++) {
//    tableData.push({
//         "city":city,
//         "zip":zip,
//         "lat":lat,
//         "lon":lon,    
//         "dt":daily[i].dt, 
//         "temp":daily[i].temp.day,
//         "min":daily[i].temp.min,
//         "max":daily[i].temp.max,
//         "moonPhase":daily[i].moon_phase,
//         "windSpeed":daily[i].wind_speed,
//         "description":daily[i].weather.description,
//         "icon":daily[i].weather.icon
        
//     });
// };  

//     table.appendRows(tableData);
//      }); 

// ///////// SELBY
// $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-100.032066&lat=45.506378&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//     var lon = -100.032066;
//     var lat = 45.506378;
//     var city = "Selby";
//     var zip = 57472;
//     var daily = data.daily;
//     tableData = [];
//   //for each result write entry
// for (var i = 0, len = daily.length; i < len; i++) {
//    tableData.push({
//         "city":city,
//         "zip":zip,
//         "lat":lat,
//         "lon":lon,    
//         "dt":daily[i].dt, 
//         "temp":daily[i].temp.day,
//         "min":daily[i].temp.min,
//         "max":daily[i].temp.max,
//         "moonPhase":daily[i].moon_phase,
//         "windSpeed":daily[i].wind_speed,
//         "description":daily[i].weather.description,
//         "icon":daily[i].weather.icon
        
//     });
// };  

//     table.appendRows(tableData);
//      }); 

// ///////// LEMMON
// $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-102.159317&lat=45.94083&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//     var lon = -102.159317;
//     var lat = 45.94083;
//     var city = "Lemmon";
//     var zip = 57638;
//     var daily = data.daily;
//     tableData = [];
//   //for each result write entry
// for (var i = 0, len = daily.length; i < len; i++) {
//    tableData.push({
//         "city":city,
//         "zip":zip,
//         "lat":lat,
//         "lon":lon,    
//         "dt":daily[i].dt, 
//         "temp":daily[i].temp.day,
//         "min":daily[i].temp.min,
//         "max":daily[i].temp.max,
//         "moonPhase":daily[i].moon_phase,
//         "windSpeed":daily[i].wind_speed,
//         "description":daily[i].weather.description,
//         "icon":daily[i].weather.icon
        
//     });
// };  

//     table.appendRows(tableData);
//      }); 

// ///////// SISSETON
// $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-97.049797&lat=45.66468&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//     var lon = -97.049797;
//     var lat = 45.66468;
//     var city = "Sisseton";
//     var zip = 57262;
//     var daily = data.daily;
//     tableData = [];
//   //for each result write entry
// for (var i = 0, len = daily.length; i < len; i++) {
//    tableData.push({
//         "city":city,
//         "zip":zip,
//         "lat":lat,
//         "lon":lon,    
//         "dt":daily[i].dt, 
//         "temp":daily[i].temp.day,
//         "min":daily[i].temp.min,
//         "max":daily[i].temp.max,
//         "moonPhase":daily[i].moon_phase,
//         "windSpeed":daily[i].wind_speed,
//         "description":daily[i].weather.description,
//         "icon":daily[i].weather.icon
        
//     });
// };  

//     table.appendRows(tableData);
//      });

// ///////// SPEARFISH
// $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-97.049797&lat=45.66468&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//     var lon = -103.859367;
//     var lat = 44.490822;
//     var city = "Spearfish";
//     var zip = 57783;
//     var daily = data.daily;
//     tableData = [];
//   //for each result write entry
// for (var i = 0, len = daily.length; i < len; i++) {
//    tableData.push({
//         "city":city,
//         "zip":zip,
//         "lat":lat,
//         "lon":lon,    
//         "dt":daily[i].dt, 
//         "temp":daily[i].temp.day,
//         "min":daily[i].temp.min,
//         "max":daily[i].temp.max,
//         "moonPhase":daily[i].moon_phase,
//         "windSpeed":daily[i].wind_speed,
//         "description":daily[i].weather.description,
//         "icon":daily[i].weather.icon
        
//     });
// };  

//     table.appendRows(tableData);
//      });

// ///////// SPRINGFIELD
// $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-97.897293&lat=42.854172&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//     var lon = -97.897293;
//     var lat = 42.854172;
//     var city = "Springfield";
//     var zip = 57062;
//     var daily = data.daily;
//     tableData = [];
//   //for each result write entry
// for (var i = 0, len = daily.length; i < len; i++) {
//    tableData.push({
//         "city":city,
//         "zip":zip,
//         "lat":lat,
//         "lon":lon,    
//         "dt":daily[i].dt, 
//         "temp":daily[i].temp.day,
//         "min":daily[i].temp.min,
//         "max":daily[i].temp.max,
//         "moonPhase":daily[i].moon_phase,
//         "windSpeed":daily[i].wind_speed,
//         "description":daily[i].weather.description,
//         "icon":daily[i].weather.icon
        
//     });
// };  

//     table.appendRows(tableData);
//      });

// ///////// STURGIS
// $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-103.509079&lat=44.40971&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//     var lon = -103.509079;
//     var lat = 44.40971;
//     var city = "Sturgis";
//     var zip = 57785;
//     var daily = data.daily;
//     tableData = [];
//   //for each result write entry
// for (var i = 0, len = daily.length; i < len; i++) {
//    tableData.push({
//         "city":city,
//         "zip":zip,
//         "lat":lat,
//         "lon":lon,    
//         "dt":daily[i].dt, 
//         "temp":daily[i].temp.day,
//         "min":daily[i].temp.min,
//         "max":daily[i].temp.max,
//         "moonPhase":daily[i].moon_phase,
//         "windSpeed":daily[i].wind_speed,
//         "description":daily[i].weather.description,
//         "icon":daily[i].weather.icon
        
//     });
// };  

//     table.appendRows(tableData);
//      });

// ///////// TYNDALL
// $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-97.862846&lat=42.993328&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//     var lon = -97.862846;
//     var lat = 42.993328;
//     var city = "Tyndall";
//     var zip = 57066;
//     var daily = data.daily;
//     tableData = [];
//   //for each result write entry
// for (var i = 0, len = daily.length; i < len; i++) {
//    tableData.push({
//         "city":city,
//         "zip":zip,
//         "lat":lat,
//         "lon":lon,    
//         "dt":daily[i].dt, 
//         "temp":daily[i].temp.day,
//         "min":daily[i].temp.min,
//         "max":daily[i].temp.max,
//         "moonPhase":daily[i].moon_phase,
//         "windSpeed":daily[i].wind_speed,
//         "description":daily[i].weather.description,
//         "icon":daily[i].weather.icon
        
//     });
// };  

//     table.appendRows(tableData);
//      });

// ///////// TIMBER LAKE
// $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-101.074028&lat=45.42915&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//     var lon = -101.074028;
//     var lat = 45.42915;
//     var city = "Timber Lake";
//     var zip = 57656;
//     var daily = data.daily;
//     tableData = [];
//   //for each result write entry
// for (var i = 0, len = daily.length; i < len; i++) {
//    tableData.push({
//         "city":city,
//         "zip":zip,
//         "lat":lat,
//         "lon":lon,    
//         "dt":daily[i].dt, 
//         "temp":daily[i].temp.day,
//         "min":daily[i].temp.min,
//         "max":daily[i].temp.max,
//         "moonPhase":daily[i].moon_phase,
//         "windSpeed":daily[i].wind_speed,
//         "description":daily[i].weather.description,
//         "icon":daily[i].weather.icon
        
//     });
// };  

//     table.appendRows(tableData);
//      });


// ///////// VERMILLION
// $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-96.929207&lat=42.779442&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//     var lon = -96.929207;
//     var lat = 42.779442;
//     var city = "Vermillion";
//     var zip = 57069;
//     var daily = data.daily;
//     tableData = [];
//   //for each result write entry
// for (var i = 0, len = daily.length; i < len; i++) {
//    tableData.push({
//         "city":city,
//         "zip":zip,
//         "lat":lat,
//         "lon":lon,    
//         "dt":daily[i].dt, 
//         "temp":daily[i].temp.day,
//         "min":daily[i].temp.min,
//         "max":daily[i].temp.max,
//         "moonPhase":daily[i].moon_phase,
//         "windSpeed":daily[i].wind_speed,
//         "description":daily[i].weather.description,
//         "icon":daily[i].weather.icon
        
//     });
// };  

//     table.appendRows(tableData);
//      });

// ///////// MADISON
// $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-97.113953&lat=44.006081&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//     var lon = -97.113953;
//     var lat = 44.006081;
//     var city = "Madison";
//     var zip = 57042;
//     var daily = data.daily;
//     tableData = [];
//   //for each result write entry
// for (var i = 0, len = daily.length; i < len; i++) {
//    tableData.push({
//         "city":city,
//         "zip":zip,
//         "lat":lat,
//         "lon":lon,    
//         "dt":daily[i].dt, 
//         "temp":daily[i].temp.day,
//         "min":daily[i].temp.min,
//         "max":daily[i].temp.max,
//         "moonPhase":daily[i].moon_phase,
//         "windSpeed":daily[i].wind_speed,
//         "description":daily[i].weather.description,
//         "icon":daily[i].weather.icon
        
//     });
// };  

//     table.appendRows(tableData);
//      });

// ///////// Yankton
// $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lon=-97.397278&lat=42.871109&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//     var lon = -97.397278;
//     var lat = 42.871109;
//     var city = "Yankton";
//     var zip = 57078;
//     var daily = data.daily;
//     tableData = [];
//   //for each result write entry
// for (var i = 0, len = daily.length; i < len; i++) {
//    tableData.push({
//         "city":city,
//         "zip":zip,
//         "lat":lat,
//         "lon":lon,    
//         "dt":daily[i].dt, 
//         "temp":daily[i].temp.day,
//         "min":daily[i].temp.min,
//         "max":daily[i].temp.max,
//         "moonPhase":daily[i].moon_phase,
//         "windSpeed":daily[i].wind_speed,
//         "description":daily[i].weather.description,
//         "icon":daily[i].weather.icon
        
//     });
// };  

//     table.appendRows(tableData);
//      });






doneCallback();
		};
	
	

    tableau.registerConnector(myConnector);
//})();

	$(document).ready(function () {
    $("#submitButton").click(function () {
       
       // tableau.connectionData = getCity();//JSON.stringify(cityObj);
        tableau.connectionName = "Daily Weather";
        tableau.submit();
    });
});
})();














// (function () {

//     var myConnector = tableau.makeConnector();
	
// 	myConnector.getSchema = function (schemaCallback) {
       
//         var cols = [
//         { id : "city", alias : "City", dataType : tableau.dataTypeEnum.string},
//         { id : "lat", alias : "Latitude",  dataType : tableau.dataTypeEnum.float},
//         { id : "lon", alias : "Longitude",  dataType : tableau.dataTypeEnum.float},
//         { id : "dt", alias : "Time Forecasted",  dataType : tableau.dataTypeEnum.datetime},
//         { id : "day", alias : "Temperature",  dataType : tableau.dataTypeEnum.float},
//         { id : "min", alias : "Min Temp",  dataType : tableau.dataTypeEnum.datetime},
//         { id : "max", alias : "Max Temp",  dataType : tableau.dataTypeEnum.float},
//         { id : "moonPhase", alias : "Moon Phase",  dataType : tableau.dataTypeEnum.float},
//         { id : "humidity", alias : "Humidity", dataType : tableau.dataTypeEnum.float},
//         { id : "windSpeed", alias : "Wind Speed", dataType : tableau.dataTypeEnum.float},
//         { id : "pop", alias : "Rain Probability", dataType : tableau.dataTypeEnum.float},
//         { id : "rain", alias : "Rain Volume", dataType : tableau.dataTypeEnum.float},
//         { id : "snow", alias : "Snow Volume", dataType : tableau.dataTypeEnum.float},
//         { id : "description", alias : "Weather Description", dataType : tableau.dataTypeEnum.string},
//         { id : "icon", alias : "Icon", dataType : tableau.dataTypeEnum.string}
//        ];

// 	var tableSchema = {
// 		id : "daily",
// 		alias : "5 Day Weather Forecast",
// 		columns : cols
// 		};
    
// 	schemaCallback([tableSchema]);
// 	};
// /////////// ABERDEEN
// 	myConnector.getData = function(table, doneCallback) {
//         let lat = -98.486481;
//         let lon = 45.464699;
//         let city = "aberdeen";
// 	$.getJSON("https://api.openweathermap.org/data/2.5/onecall?lat=44.36832&lon=-100.350967&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//        // var city = data.city;
//         var daily = data.daily,
//        // var feat = resp.features,
//         tableData = [];
//       //for each result write entry
//       //  for (var i = 0, len = feat.length; i < len; i++) {
//        for (var i = 0, len = daily.length; i < len; i++) {
//        tableData.push({
            
//             "city":city,
//             "lat":lat,
//             "lon":lon,    
//             "dt":daily[i].dt, 
//             "temp":daily[i].temp.day,
//             "min":daily[i].temp.min,
//             "max":daily[i].temp.max,
//             "moonPhase":daily[i].moon_phase,
//             "windSpeed":daily[i].wind_speed,
//             "description":daily[i].weather.description,
//             "icon":daily[i].weather.icon
            
//         });
//         }    
    
//      	table.appendRows(tableData);
// 	 	doneCallback();
// 	 	});
//      };
 
//      tableau.registerConnector(myConnector);
//     })();
    
//         $(document).ready(function () {
//         $("#submitButton").click(function () {
//             tableau.connectionName = "Aberdeen";
//             tableau.submit();
//         });
//     });


// ///////// CUSTER
//     myConnector.getData = function(table, doneCallback) {
//         let lon = -103.598808;
//         let lat = -43.766651;
//         let city = "custer";
// 	$.getJSON("https://api.openweathermap.org/data/2.5/onecall?lat=44.36832&lon=-100.350967&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
//        // var city = data.city;
//         var daily = data.daily,
//        // var feat = resp.features,
//         tableData = [];
//       //for each result write entry
//       //  for (var i = 0, len = feat.length; i < len; i++) {
//        for (var i = 0, len = daily.length; i < len; i++) {
//        tableData.push({
            
//             "city":city,
//             "lat":lat,
//             "lon":lon,    
//             "dt":daily[i].dt, 
//             "temp":daily[i].temp.day,
//             "min":daily[i].temp.min,
//             "max":daily[i].temp.max,
//             "moonPhase":daily[i].moon_phase,
//             "windSpeed":daily[i].wind_speed,
//             "description":daily[i].weather.description,
//             "icon":daily[i].weather.icon
            
//         });
//     };  
    
//     	table.appendRows(tableData);
// 		doneCallback();
// 		});
// 	};
	

//     tableau.registerConnector(myConnector);
// //})();

// 	$(document).ready(function () {
//     $("#submitButton").click(function () {
//         tableau.connectionName = "Daily Weather";
//         tableau.submit();
//     });
// });
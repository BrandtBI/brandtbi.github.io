(function () {
const appid = "0bed9dddd956dff3252a42b41eccad89";
let lat=[-96.571991, -98.486748];
let lon=[43.5947,45.467699];

    let myConnector = tableau.makeConnector();
	
	myConnector.getSchema = function (schemaCallback) {
	let cols = [
        { id : "lat", alias : "Latitude",  dataType : tableau.dataTypeEnum.float},
        { id : "lon", alias : "Longitude",  dataType : tableau.dataTypeEnum.float},
        { id : "dt", alias : "Time Forecasted",  dataType : tableau.dataTypeEnum.datetime},
        { id : "day", alias : "Temperature",  dataType : tableau.dataTypeEnum.float},
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

	let tableSchema = {
		id : "dailyForecast",
		alias : "5 Day Weather Forecast",
		columns : cols
		};
	
	schemaCallback([tableSchema]);
	};

	myConnector.getData = function(table, doneCallback) {
	//var tableData = [];	
    let connectionData = JSON.parse(tableau.connectionData);
    let lat = connectionData.lat;
    let lon = connectionData.lon;    
    tableData = [];

    if (table.tableInfo.id === "dailyForecast") {
        let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&lang=en&appid=${appid}`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            let forecasts = data.dailyForecasts;
            for (let day of forecasts) {
              tableData.push({
                "lat":day.lat,
                "lon":day.lon,    
                "dt":day.dt, 
                "temp":day.temp.day,
                "min":day.temp.min,
                "max":day.temp.max,
                "moonPhase":day.moon_phase,
                "windSpeed":day.wind_speed,
                "description":day.weather.description,
                "icon":day.weather.icon
   // $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lat=44.36832&lon=-100.350967&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
       // var city = data.city;
       // var daily = data.daily,
       // var feat = resp.features,
     //   tableData = [];
      //for each result write entry
      //  for (var i = 0, len = feat.length; i < len; i++) {
    //    for (var i = 0, len = daily.length; i < len; i++) {
    //    tableData.push({
            
    //         "lat":city.lat,
    //         "lon":city.lon,    
    //         "dt":daily[i].dt, 
    //         "temp":daily[i].temp.day,
    //         "min":daily[i].temp.min,
    //         "max":daily[i].temp.max,
    //         "moonPhase":daily[i].moon_phase,
    //         "windSpeed":daily[i].wind_speed,
    //         "description":daily[i].weather.description,
    //         "icon":daily[i].weather.icon
            
         });
        }    
    
    	table.appendRows(tableData);
		doneCallback();
		});
	};
	tableau.registerConnector(myConnector);
    window._tableau.triggerInitialization &&
    window._tableau.triggerInitialization(); // Make sure WDC is initialized properly

  //tableau.registerConnector(myConnector);
//})();

	$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "dailyForecast";
        tableau.submit();
    },
    )},
)}
();
})
(function () {

    var myConnector = tableau.makeConnector();
	
	myConnector.getSchema = function (schemaCallback) {
	var cols = [
      //  { id : "lat", alias : "Latitude",  dataType : tableau.dataTypeEnum.float},
       // { id : "lon", alias : "Longitude",  dataType : tableau.dataTypeEnum.float},
        { id : "dt", alias : "Time Forecasted",  dataType : tableau.dataTypeEnum.datetime},
        { id : "temp", alias : "Temperature",  dataType : tableau.dataTypeEnum.float},
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
		id : "WeatherFeed",
		alias : "5 Day Weather Forecast",
		columns : cols
		};
	
	schemaCallback([tableSchema]);
	};

	myConnector.getData = function(table, doneCallback) {
	//var tableData = [];	
	$.getJSON("https://api.openweathermap.org/data/2.5/onecall?lat=44.36832&lon=-100.350967&exclude=current,minutely,hourly,alerts&units=imperial&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
        //var city = data.city;
        var daily = data.daily,
       // var feat = resp.features,
        tableData = [];
      //for each result write entry
      //  for (var i = 0, len = feat.length; i < len; i++) {
       for (var i = 0, len = daily.length; i < len; i++) {
       tableData.push({
            
           // "lat":lat,
           // "lon":lon,    
            "dt":daily[i].dt, 
            "temp":daily[i].temp,
            "min":daily[i].temp.min,
            "max":daily[i].temp.max,
            "moonPhase":daily[i].moon_phase,
            "windSpeed":daily[i].wind_speed,
            "description":daily[i].weather.description,
            "icon":daily[i].weather.icon
            
        });
        }    
    
    	table.appendRows(tableData);
		doneCallback();
		});
	};
	

    tableau.registerConnector(myConnector);
})();

	$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "WeatherFeed";
        tableau.submit();
    });
});



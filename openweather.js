(function () {

    var myConnector = tableau.makeConnector();
	
	myConnector.getSchema = function (schemaCallback) {
	var cols = [
        { id : "id", alias : "City ID",  dataType : tableau.dataTypeEnum.string},
        { id : "name", alias : "City Name",  dataType : tableau.dataTypeEnum.string},
        { id : "lat", alias : "Latitude",  dataType : tableau.dataTypeEnum.float},
        { id : "lon", alias : "Longitude",  dataType : tableau.dataTypeEnum.float},
        { id : "dt", alias : "Time of Data",  dataType : tableau.dataTypeEnum.datetime},
        { id : "temp", alias : "Temp",  dataType : tableau.dataTypeEnum.float}
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
	$.getJSON("https://api.openweathermap.org/data/2.5/forecast?lat=44&lon=100&units=imperial&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
        var list = data.list;
        var city = data.city;
       // var feat = resp.features,
        tableData = [];
      //for each result write entry
      //  for (var i = 0, len = feat.length; i < len; i++) {
       for (var i = 0, len = list.length; i < len; i++) {
       tableData.push({
            
            // "id":feat[i].id,
            // "name":feat[i].city.name,
            // "lat":feat[i].city.coord.lat,
            // "lon":feat[i].city.coord.lon,
            // "dt":feat[i].list.dt,
            // "temp":feat[i].list.main.temp
            // "id":city[i]["City ID"],
            // "name":city[i]["City Name"],
            // "lat":city[i]["Latitude"],
            // "lon":city[i]["Longitude"],
            // "dt":list[i]["Time of Data"],
            // "temp":list[i]["Temperature"]
			"id":city.id,
            "name":city.name,
            "lat":city.coord.lat,
            "lon":city.coord.lon,
            "dt":list[i].dt,
            "temp":list[i].main.temp
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



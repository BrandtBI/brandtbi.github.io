(function () {

    var myConnector = tableau.makeConnector();
	
	myConnector.getSchema = function (schemaCallback) {
	var cols = [
        { id : "id", alias : "City ID",  dataType : tableau.dataTypeEnum.string},
        // { id : "name", alias : "City Name",  dataType : tableau.dataTypeEnum.string},
        // { id : "lat", alias : "Latitude",  dataType : tableau.dataTypeEnum.float},
        // { id : "lon", alias : "Longitude",  dataType : tableau.dataTypeEnum.float},
        // { id : "dt", alias : "Time of Data",  dataType : tableau.dataTypeEnum.datetime},
         { id : "temp", alias : "Temperature",  dataType : tableau.dataTypeEnum.float}
    ];

	var tableInfo = {
		id : "WeatherFeed",
		alias : "5 Day Weather Forecast",
		columns : cols
		};
	
	schemaCallback([tableInfo]);
	};

	myConnector.getData = function(table, doneCallback) {
	//var tableData = [];	
	$.getJSON("http://api.openweathermap.org/data/2.5/forecast?lat=44.3668&lon=100.3538&units=imperial&appid=0bed9dddd956dff3252a42b41eccad89", function(resp) {
       // var list = data.list;
       // var city = data.city;
        var feat = resp.features,
        tableData = [];
      //for each result write entry
        for (var i = 0, len = feat.length; i < len; i++) {
      // for (var i = 0, len = list.length; i < len; i++) {
       tableData.push({
            "city.id":["City Id"],
            // "name":city.name,
            // "lat":city.coord.lat,
            // "lon":city.coord.lon,
            // "dt":list[i].dt,
             "list.main.temp":feat[i]["Temperature"]
            // "id":feat[i].city.id,
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

        });
        }    
    
    	table.appendRows(tableData);
		doneCallback();
		});
	};
	

    tableau.registerConnector(myConnector);
	
	$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "WeatherFeed";
        tableau.submit();
    });
});
})();

        
(function () {

    var myConnector = tableau.makeConnector();
	
	myConnector.getSchema = function (schemaCallback) {
	var cols = [
        { id : "id", alias : "City ID",  dataType : tableau.dataTypeEnum.string},
        { id : "name", alias : "City Name",  dataType : tableau.dataTypeEnum.string},
        { id : "lat", alias : "Latitude",  dataType : tableau.dataTypeEnum.float},
        { id : "lon", alias : "Longitude",  dataType : tableau.dataTypeEnum.float},
        { id : "dt", alias : "Time of Data",  dataType : tableau.dataTypeEnum.datetime},
        { id : "temp", alias : "Temperature",  dataType : tableau.dataTypeEnum.float}
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
	$.getJSON("http://api.openweathermap.org/data/2.5/forecast?lat=44.3668&lon=100.3538&units=imperial&appid=0bed9dddd956dff3252a42b41eccad89", function(resp) {
      //  var list = data.list;
      //  var city = data.city;
        var feat = resp.features,
        tableData = [];
      //for each result write entry
        for (var i = 0, len = feat.length; i < len; i++) {
      // for (i = 0; i < list.length; i++) {
       tableData.push({
            // "city_id":feat[i]["City ID"],
            // "city_name":feat[i]["City Name"],
            // "city_coord_lat":feat[i]["Latitude"],
            // "city_coord_lon":feat[i]["Longitude"],
            // "list_dt":feat[i]["Time of Date"],
            // "list_main_temp":feat[i]["Temperature"]
            "id":feat[i].city.id,
            "name":feat[i].city.name,
            "lat":feat[i].city.coord.lat,
            "lon":feat[i].city.coord.lon,
            "dt":feat[i].list.dt,
            "temp":feat[i].list.main.temp
            // "city_id":feat[i]["City ID"],
            // "city_name":feat[i]["City Name"],
            // "city_coord_lat":feat[i]["Latitude"],
            // "city_coord_lon":feat[i]["Longitude"],
            // "list_dt":feat[i]["Time of Data"],
            // "list_main_temp":feat[i]["Temperature"]
            
            // "city_id":city[i].id,
            // "city_name":city[i].name,
            // "city_coord_lat":city[i].coord.lat,
            // "city_coord_lon":city[i].coord.lon,
            // "list_dt":list[i].dt,
            // "list_main_temp":list[i].main.temp
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

        
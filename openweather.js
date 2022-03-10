(function () {

    var myConnector = tableau.makeConnector();
	
	myConnector.getSchema = function (schemaCallback) {
	var cols = [
        { id : "city_id", alias : "City ID", columnRole: "dimension", dataType : tableau.dataTypeEnum.string},
        { id : "city_name", alias : "City Name", columnRole: "dimension", dataType : tableau.dataTypeEnum.string},
        { id : "city_coord.lat", alias : "Latitude", columnRole: "dimension", dataType : tableau.dataTypeEnum.geometry},
        { id : "city_coord_lon", alias : "Longitude", columnRole: "dimension", dataType : tableau.dataTypeEnum.geometry},
        { id : "list_dt", alias : "Time of Data", columnRole: "dimension", dataType : tableau.dataTypeEnum.datetime},
        { id : "list_main_temp", alias : "Temperature", columnRole: "dimension", dataType : tableau.dataTypeEnum.float}
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
        //var list = data.list;
        //var city = data.city;
        var feat = resp.features,
        tableData = [];
    //for each result write entry
        for (var i = 0; i < list.length; i++) {
        tableData.push({
            "city_id":feat[i].id,
            "city_name":feat[i].name,
            "city_coord_lat":feat[i].coord.lat,
            "city_coord_lon":feat[i].coord.lon,
            "list.dt":feat[i].dt,
            "list_main_temp":feat[i].main.temp
            // "city_id":city[i].city.id,
            // "city_name":city[i].city.name,
            // "city_coord_lat":city[i].coord.lat,
            // "city_coord_lon":city[i].coord.lon,
            // "list.dt":list[i].dt,
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

        